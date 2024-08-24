// src/app/middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

export async function middleware(req: NextRequest) {
  console.log(
    "middleware: middlewaremiddlewaremiddlewaremiddlewaremiddlewaremiddleware"
  );
  const token = req.cookies.get("token");
  console.log("token: ", token);

  if (!token) {
    return NextResponse.redirect("/login");
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Type check to ensure the decoded token has the required email field
    if (typeof decoded === "object" && decoded !== null && "email" in decoded) {
      const { email } = decoded as JwtPayload & { email: string };

      // Add decoded email to the request headers
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("X-User-Email", email);

      // Continue with the modified request
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect("/login"); // Redirect to login on token failure
  }
}

export const config = {
  matcher: "/api/:path*", // Apply middleware to the profile API route
};
