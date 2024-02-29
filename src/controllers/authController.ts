import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        id: 1
      }
    }).save()


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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email or password not valid",
      })
    }

    const user = await User.findOne(
      {
        where: {
          email: email
        },
        relations: {
          role: true
        },
        select: {
          id: true,
          email: true,
          isActive: true,
          password: true,
          role: {
            id: true
          }
        }
      }
    );

    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email or password not valid",
      })
    }

    const isValidPassword = bcrypt.compareSync(password, user.password)

    if (!isValidPassword) {
      return res.status(200).json({
        success: false,
        message: "email or password not valid",
      })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        roleId: user.role.id
      },
      "secreto",
      {
        expiresIn: "2h"
      }
    )

    res.status(200).json({
      success: true,
      message: "user loged",
      user: user,
      token: token
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user cant be logged",
    })
  }
}