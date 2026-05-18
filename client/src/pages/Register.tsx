import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

const Register = () => {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await api.post(
        "/auth/register",
        {
          username,
          email,
          password
        }
      );

      localStorage.setItem(
        "verificationEmail",
        email
      );

      navigate("/verify-otp");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="
              w-full
              p-3
              rounded-lg
              bg-slate-700
            "
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              p-3
              rounded-lg
              bg-slate-700
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
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
              bg-green-500
              hover:bg-green-600
              p-3
              rounded-lg
            "
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;