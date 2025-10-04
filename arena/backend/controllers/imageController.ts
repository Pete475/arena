import { Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

export const getImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contestID = req.body.contestID;
  try {
    const imageQuery = 'SELECT * FROM "images" WHERE "contestID" = ($1)';
    const imagesInContest = await db.query(imageQuery, [contestID]);

    res.locals.images = imagesInContest.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error in imageController.getImages: ${err}`,
      status: 500,
      message: {
        err: 'Error in imageController.getImages',
      },
    });
  }
};

export const addImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contestID = req.body.contestID;
    if (!contestID) {
      return next({
        log: 'contest not found',
        status: 401,
        message: { e: 'contest not found' },
      });
    }
    // insert image into database
    const newImage = await db.query(
      'INSERT INTO "images" ("imageLink", "voteCount", "contestID") VALUES ($1,$2,$3) RETURNING *',
      [req.body.imageLink, req.body.voteCount, req.body.contestID]
    );
    res.locals.newImage = newImage.rows[0];
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
