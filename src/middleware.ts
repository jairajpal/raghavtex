import { NextResponse } from "next/server";

export function middleware(request: Request) {
  console.log(
    "middleware: middlewaremiddlewaremiddlewaremiddlewaremiddlewaremiddleware"
  );

  console.log("Request URL:", request.url);
  return NextResponse.next();
}

export const config = {
  matcher: "*", // Apply middleware to all routes
};
