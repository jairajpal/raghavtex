"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import "../styles/globals.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState<string | null>(null);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post("/api/login", data);
      setToken(response.data.token);
      alert("Login successful");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Login to Your Account
          </h1>
          <p className="leading-relaxed mt-4">
            Please enter your credentials to access your account.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Log In
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Log In
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            <Link
              href="/register"
              className="text-indigo-500 hover:text-indigo-600"
            >
              Go to Register{" "}
            </Link>
          </p>
          <p className="text-xs text-gray-500 mt-3">
            <Link
              href="/forgotPassword"
              className="text-indigo-500 hover:text-indigo-600"
            >
              Forgot your password?{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
