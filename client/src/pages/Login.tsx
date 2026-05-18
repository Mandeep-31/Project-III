import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../services/api";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-xl w-[400px] shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          FocusPact
        </h1>

        <p className="text-slate-400 text-center mb-6">
          Stay focused. Stay accountable.
        </p>

        <form
          className="space-y-4"
          onSubmit={handleLogin}
        >

          <div>

            <label className="block mb-2 text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-lg
                bg-slate-700
                text-white
                outline-none
                border
                border-slate-600
                focus:border-blue-500
              "
            />

          </div>

          <div>

            <label className="block mb-2 text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-lg
                bg-slate-700
                text-white
                outline-none
                border
                border-slate-600
                focus:border-blue-500
              "
            />

          </div>

          <button
            type="submit"
            className="
              w-full
              bg-blue-500
              hover:bg-blue-600
              transition
              p-3
              rounded-lg
              font-semibold
              text-white
            "
          >
            Login
          </button>

          <p className="text-center text-slate-400 mt-4">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                text-blue-400
                hover:underline
              "
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;