// In: ./routes/userRoute.ts

import { Request, Response, Router } from 'express';
import { loginUser, createUser } from '../controllers/userController';

const router = Router();

// 🚨 NEW ROUTE: Handles POST /user/login for authentication.
// It uses loginUser as middleware.
router.post('/login', loginUser, (req: Request, res: Response) => {
  // Assuming loginUser successfully added 'user' data to res.locals
  // and did NOT send a response itself.
  const { user, message } = res.locals; 
  if (user) {
      // Send successful response with data from the controller
      res.status(200).json({ message: message || 'Login successful', user });
  } else {
      // Should ideally be caught by error handling, but good for safety
      res.status(500).json({ error: 'Authentication processing failed.' });
  }
});

// 🚨 NEW ROUTE: Handles POST /user/signup for user registration.
// We are using /signup instead of the generic / to be explicit.
router.post('/signup', createUser, (req: Request, res: Response) => {
    // NOTE: Your createUser controller currently sends the response directly (res.status(201).json(...)).
    // If it were designed to pass data via res.locals, this is where you'd send it.
    // Since your controller is likely sending the response, this final middleware may be redundant
    // or should be adapted to handle data passed via next(). 
    // For now, we'll keep the structure.
    const { user, message } = res.locals; 
    res.status(201).json({ message: message || 'User created', user });
});


export default router;