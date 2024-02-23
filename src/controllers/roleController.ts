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

  // recuperar la info a traves del body
  console.log(req.body);
  

  res.status(201).json(
    {
      success: true,
      message: "Role created"
    }
  )
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

