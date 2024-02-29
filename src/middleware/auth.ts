import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenData } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json(
      {
        success: false,
        message: "UNAUTHORIZED"
      }
    );
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      "secreto"
    ) as TokenData

    // Modify request object to include payload
    req.tokenData = {
      userId: decoded.userId,
      userRole: decoded.userRole,
    };

    next();
  } catch (error) {
    res.status(401).json(
      {
        success: false,
        error: "Unauthorized",
        message: "Invalid or malformed JWT token"
      }
    );
    return;
  }
}