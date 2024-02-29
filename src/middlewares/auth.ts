import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"
import { TokenData } from "../types";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Soy el auth middleware');

  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if(!token) {
      return res.status(401).json(
        {
          success: false,
          message: "UNAUTHORIZED"
        }
      )
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )

    // const decoded = jwt.decode(token)
    // console.log(decoded);
    
    req.tokenData = decoded as TokenData;

    next();
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "JWT NOT VALID OR MALFORMED"
      }
    )
  }
}