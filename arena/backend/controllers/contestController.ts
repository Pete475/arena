import { Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

export const getContest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contestID = req.query.contestID;
  try {
    const contestQuery =
      'SELECT * FROM "CONTEST" WHERE contestID = ($1) RETURNING *';
    const contest = await db.query(contestQuery, [contestID]);

    res.locals.contest = contest.rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in contestController.getContest: ${err}`,
      status: 500,
      message: {
        err: 'Error in contestController.getContest',
      },
    });
  }
};

export const addContest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // insert contest into database
    const newContest = await db.query(
      'INSERT INTO "CONTEST" (contestName) VALUES ($1) RETURNING *',
      [req.body.contestName]
    );
    res.locals.contest = newContest.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error in addImage middleware: ${err}`,
      status: 500,
      message: {
        e: 'An error occurred when adding a new image',
      },
    });
  }
};
