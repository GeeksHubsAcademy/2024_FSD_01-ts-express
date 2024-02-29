import { NextFunction, Request, Response } from "express";

export const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
     if(req.tokenData.roleName !== 'super_admin') {
      
      return res.status(401).json(
        {
          success: false,
          message: "UNAUTHORIZED"
        }
      )
     }
     
     next();    
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "You dont have permisions"
      }
    )
  }
}