// src/pages/verifyOtpPage.jsx
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authContext";
import Scrolltotop from "../components/scrolltotop";

const VerifyOtpPage = () => {
  const { verifyOTP, resendOTP, isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const emailFromQuery = params.get("email") || "";
  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // Redirect if already signed in
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email) {
      setError("Email is missing. Please register again.");
      return;
    }
    if (otp.length !== 6) {
      setError("Enter the 6-digit code.");
      return;
    }

    setLoading(true);
    const result = await verifyOTP({ email, otp });
    setLoading(false);

    if (result.success) {
      setInfo("Verified! Redirecting...");
      setTimeout(() => navigate("/"), 500);
    } else {
      setError(result.error || "Invalid OTP.");
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    if (!email) {
      setError("Email is missing.");
      return;
    }
    setResending(true);
    const result = await resendOTP(email);
    setResending(false);
    if (result.success) setInfo("A new code has been sent to your email.");
    else setError(result.error || "Could not resend OTP.");
  };

  return (
    <main className="bg-white w-screen relative flex flex-col gap-8 justify-center min-h-screen overflow-y-auto py-10 dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <Link
        to="/register"
        className="absolute top-5 left-5 z-20 cursor-pointer"
      >
        <FaArrowLeft className="text-xl" />
      </Link>

      <div className="flex flex-col gap-3 items-center pt-8 px-6">
        <p className="text-orange-400 text-2xl font-bold">Verify Email</p>
        <p className="font-semibold text-neutral-600 dark:text-neutral-300 text-sm text-center">
          Enter the 6-digit code sent to
        </p>
        {emailFromQuery ? (
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {emailFromQuery}
          </p>
        ) : (
          <input
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-orange-100 outline-none rounded-xl p-2 text-sm w-2/3 text-center placeholder:text-neutral-700"
          />
        )}
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

      <form onSubmit={handleVerify} className="flex flex-col gap-5 p-5">
        <input
          type="text"
          inputMode="numeric"
          placeholder="6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="bg-orange-100 outline-none rounded-xl p-3 text-center text-2xl tracking-widest placeholder:text-neutral-700"
          maxLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="bg-gradient-to-b from-orange-600 to-orange-400 text-white rounded-xl py-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="text-orange-400 hover:text-orange-600 text-sm disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend code"}
        </button>
      </form>

      <p className="w-full flex justify-center gap-2 text-sm pb-4">
        <span className="text-neutral-600 dark:text-neutral-300">
          Wrong email?
        </span>
        <Link
          to="/register"
          className="text-orange-400 hover:text-orange-600 font-semibold"
        >
          Go back
        </Link>
      </p>
    </main>
  );
};

export default VerifyOtpPage;