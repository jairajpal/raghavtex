"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../../styles/globals.css";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirect to /login after successful login check
  }, [router]);

  return null; // You can return null instead of an empty fragment if nothing needs to be rendered
};

export default HomePage;
