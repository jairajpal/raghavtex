"use client";
import Image from "next/image";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // router.push("/");
    } else {
      // router.push("/home");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex flex-col h-screen">
      {/* Main Content with Image and Text Overlay */}
      <main>
        <Image
          src="/homeImg.jpg" // Replace with your image path
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className="w-full h-full"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-customBrown text-9xl font-bold animate-fadeIn drop-shadow-2xl font-newAmsterdam">
            Raghav tex
          </h1>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
