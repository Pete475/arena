import { Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

export const getContest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contestName = req.body.contestName;
  try {
    const contestQuery = 'SELECT * FROM "contest" WHERE "contestName" = ($1)';
    const contest = await db.query(contestQuery, [contestName]);

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
      'INSERT INTO "contest" ("contestName", "ownerID", "created_at") VALUES ($1, $2, $3) RETURNING *',
      [req.body.contestName, req.body.ownerID, new Date()]
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
