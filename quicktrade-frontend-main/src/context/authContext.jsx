// src/context/authContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:8000";

const STORAGE_KEY = "authToken";

export const authContext = createContext();

// Shared axios instance — every page/component imports this
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Send the token on every request using the scheme the backend expects
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// On 401, clear the token and bounce to /login
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY);
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(true); // kept for LoginPage toggle

  // ---------------------------------------------------------------
  // Session helpers
  // ---------------------------------------------------------------
  const persistUser = useCallback((nextUser) => {
    setUser(nextUser);
    setIsAuthenticated(!!nextUser);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // ---------------------------------------------------------------
  // Check auth on mount — hits /profile/
  // ---------------------------------------------------------------
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get("/profile/");
      if (response.data?.success) {
        persistUser(response.data.data);
      } else {
        clearSession();
      }
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [persistUser, clearSession]);

  // ---------------------------------------------------------------
  // Register — backend expects password2
  // ---------------------------------------------------------------
  const registerUser = async ({
    email,
    password,
    password2,
    first_name,
    last_name,
    phone,
    current_mode,
  }) => {
    try {
      const response = await api.post("/accounts/register/", {
        email,
        password,
        password2: password2 || password,
        first_name: first_name || "",
        last_name: last_name || "",
        phone: phone || "",
        current_mode: current_mode || "Buyer",
      });
      if (response.data?.success) {
        sessionStorage.setItem("pendingEmail", response.data.data.email);
        return { success: true, data: response.data.data };
      }
      return {
        success: false,
        error: response.data?.error || "Registration failed",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed",
      };
    }
  };

  // ---------------------------------------------------------------
  // Resend OTP
  // ---------------------------------------------------------------
  const resendOTP = async (email) => {
    try {
      const response = await api.post("/accounts/resend-otp/", { email });
      if (response.data?.success) {
        return { success: true, message: response.data.message };
      }
      return {
        success: false,
        error: response.data?.error || "Failed to resend OTP",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to resend OTP",
      };
    }
  };

  // ---------------------------------------------------------------
  // Verify OTP — backend logs the user in and returns a token
  // ---------------------------------------------------------------
  const verifyOTP = async ({ email, otp }) => {
    try {
      const response = await api.post("/accounts/verify-otp/", { email, otp });
      if (response.data?.success) {
        const { user: verifiedUser, token } = response.data.data || {};
        if (token) localStorage.setItem(STORAGE_KEY, token);
        if (verifiedUser) persistUser(verifiedUser);
        else await checkAuth();
        sessionStorage.removeItem("pendingEmail");
        return { success: true, data: response.data.data };
      }
      return {
        success: false,
        error: response.data?.error || "OTP verification failed",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "OTP verification failed",
        code: error.response?.data?.code,
      };
    }
  };

  // ---------------------------------------------------------------
  // Sign in — email or phone + password
  // ---------------------------------------------------------------
  const loginUser = async ({
    identifier,
    password,
    remember_me = false,
  }) => {
    try {
      const response = await api.post("/accounts/sign-in/", {
        identifier,
        password,
        remember_me,
      });
      if (response.data?.success) {
        const { token, user: signedInUser } = response.data.data || {};
        if (token) localStorage.setItem(STORAGE_KEY, token);
        if (signedInUser) persistUser(signedInUser);
        else await checkAuth();
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response.data?.error || "Login failed" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
        code: error.response?.data?.code,
      };
    }
  };

  // ---------------------------------------------------------------
  // Logout
  // ---------------------------------------------------------------
  const logoutUser = async () => {
    try {
      await api.post("/accounts/logout/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearSession();
    }
  };

  // ---------------------------------------------------------------
  // Mode selection (Buyer / Seller)
  // ---------------------------------------------------------------
  const updateUserMode = async (mode, gender = "Male") => {
    try {
      const response = await api.post("/accounts/select-mode/", {
        mode,
        gender,
      });
      if (response.data?.success) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                current_mode: response.data.data.current_mode,
                gender: response.data.data.gender,
              }
            : prev
        );
        return { success: true, data: response.data.data };
      }
      return {
        success: false,
        error: response.data?.error || "Failed to update mode",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to update mode",
      };
    }
  };

  // ---------------------------------------------------------------
  // Profile: refresh, edit, avatar
  // ---------------------------------------------------------------
  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/profile/");
      if (response.data?.success) {
        persistUser(response.data.data);
        return { success: true, data: response.data.data };
      }
      return {
        success: false,
        error: response.data?.error || "Failed to refresh user",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to refresh user",
      };
    }
  }, [persistUser]);

  const updateProfile = async (payload) => {
    try {
      const response = await api.post("/profile/edit/", payload);
      if (response.data?.success) {
        persistUser(response.data.data);
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response.data?.error || "Update failed" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Update failed",
      };
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await api.post("/profile/avatar/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.success) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                profile: {
                  ...prev.profile,
                  avatar_url: response.data.data.avatar_url,
                },
              }
            : prev
        );
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response.data?.error || "Upload failed" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Upload failed",
      };
    }
  };

  const removeAvatar = async () => {
    try {
      const response = await api.post("/profile/avatar/remove/");
      if (response.data?.success) {
        setUser((prev) =>
          prev
            ? { ...prev, profile: { ...prev.profile, avatar_url: null } }
            : prev
        );
        return { success: true };
      }
      return { success: false, error: response.data?.error || "Remove failed" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Remove failed",
      };
    }
  };

  // ---------------------------------------------------------------
  // Run checkAuth on mount
  // ---------------------------------------------------------------
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    setLogin,
    loginUser,
    registerUser,
    verifyOTP,
    resendOTP,
    logoutUser,
    checkAuth,
    updateUserMode,
    refreshUser,
    updateProfile,
    uploadAvatar,
    removeAvatar,
    api,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;