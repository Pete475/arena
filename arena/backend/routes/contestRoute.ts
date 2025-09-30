import { Request, Response, Router } from 'express';
import { getContest, addContest } from '../controllers/contestController';

const router = Router();

router.get('/', getContest, (_req: Request, res: Response) => {
  res.json(res.locals.contest);
});

router.post('/', addContest, (_req: Request, res: Response) => {
  res.json(res.locals.contest);
});

export default router;
