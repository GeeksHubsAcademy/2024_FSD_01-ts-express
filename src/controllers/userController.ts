import { Request, Response } from "express"
import { User } from "../models/User"
import { FindOperator, Like } from "typeorm"

export const getUsers = async (req: Request, res: Response) => {
  try {
    interface queryFilters {
      email?: FindOperator<string>,
      name?: FindOperator<string>
    }

    const queryFilters: queryFilters = {} 

    if(req.query.email) {
      queryFilters.email = Like("%"+req.query.email.toString()+"%");
    }

    if(req.query.name) {
      queryFilters.name = Like("%"+req.query.name.toString()+"%");
    }

    //recuperar las querys

    // const email = req.query.email;
    // const name = req.query.name;

    // interface queryFiltersI {
    //   email?: string
    //   name?: string 
    // }

    // let queryFilters: queryFiltersI = {}

    // if(email) {
    //   queryFilters.email = email as string
    // }
    
    // if(name) {
    //   queryFilters.name = name as string
    // }
    
    console.log(queryFilters);
    

    const users = await User.find(
      {
        // where: {
        //   email: email
        // },
        // where: {
        //   email: Like(req.query.email)
        // }
        where: queryFilters,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        }
      }
    )

    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "users cant be retrieved",
      error: error
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findOneBy(
      {
        id: parseInt(userId)
      }
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "user retrieved",
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user cant be retrieved",
      error: error
    })
  }
}

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const name = req.body.name;

    // validar datos
    const user = await User.findOneBy(
      {
        id: parseInt(userId)
      }
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      })
    }

    // tratar datos

    // actualizar en BD
    const userUpdated = await User.update(
      {
        id: parseInt(userId)
      },
      {
        name: name
      }
    );

    //responder
    res.status(200).json({
      success: true,
      message: "user updated",
      data: userUpdated
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user cant be updated",
      error: error
    })
  }
}

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const userToRemove: any = await User.findOneBy({
      id: parseInt(userId),
    })

    if(!userToRemove) {
      res.status(404).json({
        success: false,
        message: "user cant be deleted",
      })
    }    
    
    const userDeleted = await User.delete(userToRemove)

    res.status(200).json({
      success: false,
      message: "user deleted",
      data: userDeleted
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user cant be deleted",
      error: error
    })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // recuperar la data
    const name = req.body.name
    const userId = req.tokenData.userId

    // validar la data
    if(!name) {
      return res.status(400).json(
        {
          success: false,
          message: "name is needed"
        }
      )
    }

    // tratar la data

    // actualizar en bd
    const userUpadated = User.update(
      {
        id: userId
      },
      {
        name: name
      }
    )

    // responder
    res.status(200).json(
      {
        success: true,
        message: "user updated",
        data: userUpadated
      }
    )
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user profile cant be updated",
      error: error
    })
  }
}