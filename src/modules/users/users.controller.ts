// src/modules/users/users.controller.ts
import { Request, Response } from 'express';
import { userValidationSchema } from './users.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body against the schema
    const result = userValidationSchema.safeParse(req.body);

    if (!result.success) {
      // If validation fails, return a 400 status with the validation errors
      return res.status(400).json(result.error.errors);
    }

    // Create the user in the database (replace with actual database interaction)
    // const newUser = await User.create(result.data);

    // Return the created user with a 201 status
    res.status(201).json(result);
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const userController = {
  createUser,
};
