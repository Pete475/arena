import { Request, Response, Router } from 'express';
import {getImages, addImage} from '../controllers/imageController';

const router = Router();


router.get('/', getImages, (_req: Request, res: Response) => {
    res.json(res.locals.images);
});

router.post('/', addImage, (_req: Request, res: Response) => {
    res.json(res.locals.newImage);
});

export default router;