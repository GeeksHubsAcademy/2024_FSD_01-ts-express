import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // const { email, password } = req.body

    // Validacion password
    if (password.length < 6 || password.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Eres toooooooonto la contraseña tiene que estar entre 6 y 10 caracateres"
      })
    }

    // Validacion email
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(email)) {
      return res.status(400).json(
        {
          success: false,
          message: "format email invalid"
        }
      )
    }

    // tratamos la data si fuera necesario
    const passwordEncrypted = bcrypt.hashSync(password, 8);
    // comprobamos que se genara la contraseña encriptada
    console.log(passwordEncrypted);

    const newUser = await User.create({
      name: name,
      email: email,
      password: passwordEncrypted,
      role: {
        id:1
      }
    }).save()

    // todo enviar email

    res.status(201).json(
      {
        success: true,
        message: 'User registered successfully',
        data: newUser
      }
    )
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user cant be registered",
      error: error
    })
  }
}

export const login = async(req:Request, res: Response) => {
  try {
    // recuperar la info
    const email = req.body.email;
    const password = req.body.password;

    // validacion de email password
    if(!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are needed",
      })
    }

    // todo validar formato email

    const user = await User.findOne(
      {
        where :{
          email: email
        },
        relations: {
          role: true
        },
        select: {
          id: true,
          password: true,
          email: true,
          role: {
            id: true,
            name: true
          }
        }
      }
    )

    console.log(user);
    
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "Email o Pasword invalid",
      })
    }

    const isValidPassword = bcrypt.compareSync(password, user!.password);

    if(!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Email o Pasword invalid",
      })
    }

    // crear token
    const token = jwt.sign(
      {
        userId: user.id,
        roleName: user.role.name
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h"
      }
    )

    res.status(200).json({
      success: true,
      message: "user logged",
      token: token
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user cant be logged",
      error: error
    })
  }
}