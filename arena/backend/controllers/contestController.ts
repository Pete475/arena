import { Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

export const getContestById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contestID = req.params.id;
  try {
    const contestQuery = 'SELECT * FROM contest WHERE contestID = $1';
    const contest = await db.query(contestQuery, [contestID]);

    res.locals.contest = contest.rows[0];
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
    const { contestName } = req.body;
    const result = await db.query(
      'INSERT INTO contest (contestName) VALUES ($1) RETURNING *',
      [contestName]
    );
    res.locals.contest = result.rows[0];
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

export const getAllContests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await db.query('SELECT * FROM contest');
    res.locals.contest = result.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};
