import { Request, Response, Router } from 'express';
import {
  getContestById,
  addContest,
  getAllContests,
} from '../controllers/contestController';

const router = Router();

router.options('/', (_req, res) => res.sendStatus(200));

router.get('/', getAllContests, (_req: Request, res: Response) => {
  console.log("router get all contests:", res.locals.contest); 
  res.json(res.locals.contest);
});

router.get('/:id', getContestById, (_req: Request, res: Response) => {
  res.json(res.locals.contest);
});

router.post('/', addContest, (_req: Request, res: Response) => {
  res.json(res.locals.contest);
});

export default router;
