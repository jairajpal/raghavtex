"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../styles/globals.css";
import Image from "next/image";

const HomePage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  router.push("/login"); // Redirect to /home after successful login checksss

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post("/api/login", data);
      // console.log("response: ", response);
      router.push("/home"); // Redirect to /home after successful login checksss
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <section className="dark body-font">
      <Image
        src="/homeImg.jpg" // Replace with your image path
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        className="w-full h-full"
        priority
      />
      <div className="relative container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl ">
            Login to Your Account
          </h1>
          <p className="leading-relaxed mt-4">
            Please enter your credentials to access your account.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2  rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className=" text-lg font-medium title-font mb-5">Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                name="email"
                className="w-full rounded border text-gray-950 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                id="password"
                name="password"
                className="w-full bg-white text-gray-950 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button type="submit" className="relative btn">
              Log In
            </button>
          </form>
          <p className="text-xs relative mt-3">
            <Link href="/register" className=" hover:text-indigo-600">
              Go to Register{" "}
            </Link>
          </p>
          <p className="text-xs relative mt-3">
            <Link href="/forgotPassword" className=" hover:text-indigo-600">
              Forgot your password?{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
