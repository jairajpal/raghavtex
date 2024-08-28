"use client";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isInventoryManagementActive = pathname === "/raw-material";
  const isTanaActive = pathname === "/tana";

  console.log("isAuthenticated: Header", isAuthenticated);

  const [href, setHref] = useState("/");
  const [profile, setProfile] = useState(null);

  const getCSRFToken = () => {
    const csrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    return csrfCookie;
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/profile/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const onLogout = async () => {
    try {
      console.log("onLogout: ");
      console.log("getCSRFToken(): ", getCSRFToken());
      const response = await axiosInstance.post(
        "/api/logout/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
          },
        }
      );
      console.log("response: ", response);
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setHref("/home");
      fetchProfile();
    } else {
      setHref("/");
      fetchProfile();
    }
  }, [isAuthenticated]);

  return (
    <header className="body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center mb-4 md:mb-0">
          <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
        </a>
        <Link href={href} className="hover:text-gray-500">
          <span className="ml-3 text-xl">Raghav tex</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {isAuthenticated && (
            <>
              <Link
                href="/raw-material"
                className={`mr-5 hover:text-gray-500 transform transition-transform duration-300 ${
                  isInventoryManagementActive ? "text-xl" : ""
                }`}
              >
                Inventory Management
              </Link>
              <Link
                href="/tana"
                className={`mr-5 hover:text-gray-500 transform transition-transform duration-300 ${
                  isTanaActive ? "text-xl" : ""
                }`}
              >
                Tana
              </Link>
            </>
          )}
        </nav>
        <div className="">
          <ThemeToggleButton />
        </div>
        <div className="px-8">
          <button className="btn relative" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
