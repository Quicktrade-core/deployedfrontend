// src/pages/registerPage.jsx
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authContext";
import apple from "../assets/apple.jpg";
import google from "../assets/google.jpg";
import Scrolltotop from "../components/scrolltotop";

const RegisterPage = () => {
  const { registerUser, isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState("Buyer");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const modes = [
    { id: "Buyer", label: "Buyer", icon: "🛍️" },
    { id: "Seller", label: "Seller", icon: "📦" },
  ];

  // Redirect if already signed in
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const result = await registerUser({
      email,
      password,
      password2: confirmPassword,
      first_name: firstName || email.split("@")[0],
      last_name: lastName,
      phone,
      current_mode: mode,
    });
    setLoading(false);

    if (result.success) {
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } else {
      setError(result.error || "Registration failed.");
    }
  };

  return (
    <main className="bg-white w-screen relative flex flex-col gap-8 justify-center min-h-screen overflow-y-auto py-10 dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 z-20 cursor-pointer"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      <div className="flex flex-col gap-3 items-center pt-8">
        <p className="text-orange-400 text-2xl font-bold">Create Account</p>
        <p className="font-semibold text-neutral-600 dark:text-neutral-300 text-sm">
          Create an account with QuickTrade
        </p>
      </div>

      {error && (
        <p className="mx-5 bg-red-100 text-red-600 border border-red-300 rounded-xl p-2 text-center text-sm">
          {error}
        </p>
      )}

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-orange-100 outline-none rounded-xl p-2 w-1/2 placeholder:text-neutral-700"
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-orange-100 outline-none rounded-xl p-2 w-1/2 placeholder:text-neutral-700"
          />
        </div>

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700"
          required
        />

        <input
          type="tel"
          placeholder="phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700"
        />

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm text-neutral-600 dark:text-neutral-300">
            I want to join as:
          </label>
          <div className="flex gap-3">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  mode === m.id
                    ? "border-orange-500 bg-orange-50 dark:bg-neutral-800"
                    : "border-neutral-200 dark:border-neutral-700"
                }`}
              >
                <div className="text-2xl">{m.icon}</div>
                <div className="font-bold text-sm">{m.label}</div>
              </button>
            ))}
          </div>
        </div>

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700"
          required
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-orange-100 outline-none rounded-xl p-2 placeholder:text-neutral-700"
          required
        />

        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
          Password must be at least 8 characters and include an uppercase letter,
          a lowercase letter, a number, and a special symbol.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <div className="flex flex-col gap-3 mt-2">
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

      <p className="w-full flex justify-center gap-2 text-sm pb-4">
        <span className="text-neutral-600 dark:text-neutral-300">
          Already have an account?
        </span>
        <Link
          to="/login"
          className="text-orange-400 hover:text-orange-600 font-semibold"
        >
          Login here
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;