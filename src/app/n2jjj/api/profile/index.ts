// pages/api/profile.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../../lib/db"; // Update with your database setup

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Retrieve email from headers set by the middleware
      const email = req.headers["x-user-email"] as string;

      if (!email) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Fetch user profile from the database
      const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
