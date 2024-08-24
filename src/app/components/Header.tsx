"use client";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [href, setHref] = useState("/");
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      setProfile(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Failed to fetch profile:", error.response.statusText);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error fetching profile:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
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
              <Link href="/raw-material" className="mr-5 hover:text-gray-500">
                Raw Material
              </Link>
              <Link href="/company" className="mr-5 hover:text-gray-500">
                Company
              </Link>
              <Link href="/tana" className="mr-5 hover:text-gray-500">
                Tana
              </Link>
              <Link href="/fourth" className="mr-5 hover:text-gray-500">
                Fourth Link
              </Link>
            </>
          )}
        </nav>
        <div className="">
          <ThemeToggleButton />
        </div>
        <div className="px-8">
          <button className="btn relative" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
