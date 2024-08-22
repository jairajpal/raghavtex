import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Ensure this matches the one used for signing tokens

export const authenticate = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, SECRET_KEY);
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};
