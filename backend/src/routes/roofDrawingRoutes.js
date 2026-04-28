import express from 'express';
import {
  createRoofDrawing,
} from '../controllers/roofDrawingController.js';

const router = express.Router();

router.post('/', createRoofDrawing);


export default router;
