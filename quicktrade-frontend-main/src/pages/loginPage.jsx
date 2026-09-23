// src/pages/loginPage.jsx
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authContext";
import apple from "../assets/apple.jpg";
import google from "../assets/google.jpg";
import Scrolltotop from "../components/scrolltotop";

const LoginPage = () => {
  const { loginUser, isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    const result = await loginUser({
      identifier: email,
      password,
      remember_me: rememberMe,
    });
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else if (result.code === "EMAIL_NOT_VERIFIED") {
      // Account exists but not verified — send to OTP page with their email
      const targetEmail = result.data?.email || email;
      navigate(`/verify-otp?email=${encodeURIComponent(targetEmail)}`);
    } else {
      setError(result.error || "Login failed.");
    }
  };

  return (
    <main className="bg-white w-screen relative flex flex-col gap-8 justify-center min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 z-20 cursor-pointer"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      <div className="flex flex-col gap-3 items-center">
        <p className="text-orange-400 text-2xl font-bold">Login</p>
        <p className="font-semibold text-neutral-600 dark:text-neutral-300 text-sm">
          Welcome to QuickTrade
        </p>
      </div>

      {error && (
        <p className="mx-5 bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-center text-sm">
          {error}
        </p>
      )}
      {info && (
        <p className="mx-5 bg-green-100 text-green-700 border border-green-300 rounded-xl p-2 text-center text-sm">
          {info}
        </p>
      )}

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700"
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700"
          required
        />

        <label className="flex items-center gap-2 text-sm self-start">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me for 2 weeks
        </label>

        <Link
          to="/"
          className="text-orange-400 self-end hover:text-orange-600 text-sm"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="flex flex-col gap-5">
          <div className="flex justify-center items-center gap-3">
            <span className="w-1/5 h-0.5 bg-neutral-300"></span>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              or continue with
            </p>
            <span className="w-1/5 h-0.5 bg-neutral-300"></span>
          </div>
          <div className="flex justify-center items-center gap-5">
            <button type="button" className="p-2 rounded-xl cursor-pointer">
              <img src={google} alt="Google icon" className="w-10" />
            </button>
            <button type="button" className="p-3 rounded-xl cursor-pointer">
              <img src={apple} alt="Apple icon" className="w-8" />
            </button>
          </div>
        </div>
      </form>

      <p className="absolute bottom-5 w-full flex justify-center gap-2 text-sm">
        <span className="text-neutral-600 dark:text-neutral-300">
          Create a new account?
        </span>
        <Link
          to="/register"
          className="text-orange-400 cursor-pointer hover:text-orange-600 font-semibold"
        >
          Click here
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;