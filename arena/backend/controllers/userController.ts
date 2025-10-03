// userController.ts

import { Request, Response, NextFunction } from 'express';
import db from '../models/userModel'; // The PostgreSQL Pool
import * as bcrypt from 'bcrypt'; // Import bcrypt

const SALT_ROUNDS = 10; // Good standard for salt rounds

// POST /user - Create a new user (Registration)
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // New fields: user (email) and password
    const { user, password } = req.body; // 'user' is the email address

    // Basic validation
    if (!user || !password) {
      return res
        .status(400)
        .json({ error: 'Missing required fields (user/email and password).' });
    }

    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 2. Check if user (email) already exists (optional but recommended)
    const existingUser = await db.query(
      'SELECT user FROM user WHERE user = $1',
      [user]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ error: 'User with this username already exists.' });
    }

    // 3. Insert new user into the "USER" table
    const query =
      'INSERT INTO "user" ("user", password, created_at) VALUES ($1, $2, $3) RETURNING user'; // Don't return the hashed password

    console.log('query', query);
    const newUser = await db.query(query, [user, hashedPassword, new Date()]);

    // 201 Created status code is standard for successful POST
    res.status(201).json({
      message: 'User created successfully!',
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error('Error in createUser:', err);
    next(err);
  }
};

// You'll also need a new function for user login (Authentication)
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, password } = req.body;

    // 1. Find the user by email
    const result = await db.query('SELECT * FROM "user" WHERE "user" = $1', [
      user,
    ]);
    const foundUser = result.rows[0];

    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // 2. Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Success: Return user data (excluding password)
    // You would typically generate a JWT here.
    const userData = foundUser;
    res.status(200).json({ message: 'Login successful', user: userData });
  } catch (err) {
    console.error('Error in loginUser:', err);
    next(err);
  }
};
