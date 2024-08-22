import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db"; // Update with your database setup
import { authenticate } from "../../lib/authMiddleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await db.any("SELECT email FROM users");
    console.log("users: ", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export default authenticate(handler);
