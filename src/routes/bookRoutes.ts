import express from 'express';
import { body, param } from 'express-validator';
import { bookController } from '../controllers/bookController';

const router = express.Router();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.post(
  '/',
  [
    body('title').notEmpty().isString(),
    body('author').notEmpty().isString(),
    body('publishedYear').notEmpty().isInt({ min: 1000, max: new Date().getFullYear() }),
  ],
  bookController.create
);
router.put(
  '/:id',
  [
    param('id').isUUID(4), // Assuming book IDs are UUIDs
    body('title').notEmpty().isString(),
    body('author').notEmpty().isString(),
    body('publishedYear').notEmpty().isInt({ min: 1000, max: new Date().getFullYear() }),
  ],
  bookController.update
);
router.delete('/:id', bookController.remove);

export { router as bookRoutes };

