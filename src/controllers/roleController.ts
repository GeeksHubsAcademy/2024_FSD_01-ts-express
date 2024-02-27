import { Request, Response } from "express"
import { Role } from "../models/Role";

export const getRoles = (req: Request,res: Response) => {
  res.status(200).json(
    {
      success: true,
      message: "Roles retrieved successfuly"
    }
  )
}

export const createRole = async(req: Request, res: Response) => {
  try {
    
  // recuperar la info a traves del body
  console.log(req.body);
  const name = req.body.name;

  if (name.length > 50) {
    return res.status(400).json({
      success: false,
      message: "Role name must be under 50 characters"
    })
  }

  const newRole = await Role.create({
    name: name
  }).save()

  res.status(201).json(
    {
      success: true,
      message: "Role created",
      data: newRole
    }
  )
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "role cant be created",
      error: error
    })
  }
}

export const updateRole = (req: Request, res: Response) => {

  // recuperar parametros de la ruta
  console.log(req.params.id);
  

  res.status(200).json(
    {
      success: true,
      message: "Role updated"
    }
  )
}

export const deleteRole = (req: Request, res: Response) => {

  // recuperar parametros de la ruta
  console.log(req.params.id);

  res.status(200).json(
    {
      success: true,
      message: "Role deleted"
    }
  )
}

