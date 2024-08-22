import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../lib/db"; // Update with your database setup

const SECRET_KEY = "your_secret_key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ email: user.email }, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Database error:", error); // Log the detailed error
      res.status(500).json({ error: "Failed to login" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
