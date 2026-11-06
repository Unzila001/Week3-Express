import express from 'express';
import multer from 'multer';
import { createThumbnail } from '../../middlewares/upload.js';

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId,
} from '../controllers/cat-controller.js';

const upload = multer({ dest: 'uploads/' });
const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCat)
  .post(upload.single(`cat`), createThumbnail, postCat);

catRouter.route('/user/:userId').get(getCatsByUserId);
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
