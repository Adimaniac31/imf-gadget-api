import express from 'express';
import {
  getAllGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
  triggerSelfDestruct,
  restoreGadget
} from '../controllers/gadgetController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

router.get('/', getAllGadgets);
router.post('/', createGadget);
router.patch('/:id', updateGadget);
router.delete('/:id', deleteGadget);
router.post('/:id/self-destruct', triggerSelfDestruct);
router.patch('/:id/restore', restoreGadget);

export default router;


