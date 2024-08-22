import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { db } from "../../lib/db"; // Update with your database setup

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword: ", hashedPassword);

      await db.query("INSERT INTO users(email, password) VALUES($1, $2)", [
        email,
        hashedPassword,
      ]);

      res.status(201).json({ message: "User registered" });
    } catch (error) {
      console.error("Database error:", error); // Log the detailed error
      res.status(500).json({ error: "Failed to register user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
