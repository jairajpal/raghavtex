"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import "../../../styles/globals.css"; // Ensure your global styles are imported
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { getCSRFToken } from "@/utils/tools";

type FormData = {
  email: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axiosInstance.post("/api/register/", data, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });
      alert("User registered successfully");
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <section className="body-font">
      <Image
        src="/homeImg.jpg" // Replace with your image path
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        className="w-full h-full"
        priority
      />
      <div className="dark container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="relative lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl">
            Create your own credentials
          </h1>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="relative text-lg font-medium title-font mb-5">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm ">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm ">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button type="submit" className="btn relative">
              Register
            </button>
          </form>
          <p className="text-xs mt-3 relative">
            <Link href="/" className=" hover:text-indigo-600">
              Go back to Login page{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
