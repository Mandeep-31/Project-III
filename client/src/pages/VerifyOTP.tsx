import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

const VerifyOTP = () => {

  const navigate = useNavigate();

  const [otp, setOtp] =
    useState("");

  const email =
    localStorage.getItem(
      "verificationEmail"
    );

  const handleVerify = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await api.post(
        "/auth/verify-otp",
        {
          email,
          otp
        }
      );

      alert(
        "Email verified successfully"
      );

      navigate("/");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "OTP verification failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Verify OTP
        </h1>

        <p className="text-slate-400 text-center mb-6">
          Enter the OTP sent to your email
        </p>

        <form
          onSubmit={handleVerify}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            className="
              w-full
              p-3
              rounded-lg
              bg-slate-700
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-blue-500
              hover:bg-blue-600
              p-3
              rounded-lg
            "
          >
            Verify OTP
          </button>

        </form>

      </div>

    </div>
  );
};

export default VerifyOTP;