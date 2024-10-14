"use client";
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import { useAuth } from "../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter, usePathname } from "next/navigation";
import { handleApiError } from "@/utils/tools";
import { ErrorContext } from "@/contexts/ErrorContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { addError } = useContext(ErrorContext);

  const isInventoryManagementActive = pathname === "/raw-material";
  const isTanaActive = pathname === "/tana";
  const isChatActive = pathname === "/chat";

  const [href, setHref] = useState("/");

  const onLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/logout/", {}, {});
      logout();
      router.push("/login");
    } catch (error: any) {
      handleApiError(error, addError);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setHref("/about");
      // fetchProfile();
    } else {
      setHref("/");
      // fetchProfile();
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
                  isInventoryManagementActive
                    ? "text-2xl font-bold underline decoration-dotted"
                    : ""
                }`}
              >
                Inventory Management
              </Link>
              <Link
                href="/tana"
                className={`mr-5 hover:text-gray-500 transform transition-transform duration-300 ${
                  isTanaActive
                    ? "text-2xl font-bold underline decoration-dotted"
                    : ""
                }`}
              >
                Tana
              </Link>
              <Link
                href="/chat"
                className={`mr-5 hover:text-gray-500 transform transition-transform duration-300 ${
                  isChatActive
                    ? "text-2xl font-bold underline decoration-dotted"
                    : ""
                }`}
              >
                Chat
              </Link>
            </>
          )}
        </nav>
        <div className="">
          <ThemeToggleButton />
        </div>
        {isAuthenticated && (
          <>
            <div className="px-4 pl-8">
              <button
                className="relative bg-slate-300 p-2 w-10 h-10 rounded-lg hover:bg-blue-200"
                onClick={onLogout}
              >
                <img src="/logout.png" alt="logout" />
              </button>
            </div>
            <div className="px-4 pr-8">
              <button
                className="relative bg-slate-300 p-2 w-10 h-10 rounded-lg hover:bg-blue-200"
                onClick={onLogout}
              >
                <img src="/profile.png" alt="logout" />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
