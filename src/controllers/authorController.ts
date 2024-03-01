import { Request, Response } from "express";
import { Author } from "../models/Author";

export const createAuthor = async(req: Request, res: Response) => {
  try {
    // recuperar la data
    const name = req.body.name;
    const nationality = req.body.nationality;

    // validar la data
    if(!name || !nationality) {
      return res.status(400).json({
        success: false,
        message: "Name and nationality are needed"
      })
    }

    // todo comprobar que ese author no existe en nuestra base datos

    // Guardar en bd
    const newAuthor = await Author.create({
      // name,
      name: name,
      // nationality,
      nationality: nationality
    }).save()    

    res.status(201).json(
      {
        success: true,
        message: "create author",
        data: newAuthor
      }
    )
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "cant create author",
        error: error
      }
    )
  }
}