import { Request, Response } from "express"

export const getRoles = (req: Request,res: Response) => {
  res.status(200).json(
    {
      success: true,
      message: "Roles retrieved successfuly"
    }
  )
}

export const createRole = (req: Request, res: Response) => {
  res.status(201).json(
    {
      success: true,
      message: "Role created"
    }
  )
}

