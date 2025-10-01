import { Request, Response, Router } from 'express';
import { loginUser, createUser } from '../controllers/userController';

const router = Router();

// Routes for the base collection: /
// This handles:
// 1. GET / (which corresponds to GET /users)
router.get('/', loginUser, (_req: Request, res: Response) => {
  res.json(res.locals.user);
});
// 2. POST / (which corresponds to POST /users)
router.post('/', createUser, (_req: Request, res: Response) => {
  res.json(res.locals.user);
});

export default router;
