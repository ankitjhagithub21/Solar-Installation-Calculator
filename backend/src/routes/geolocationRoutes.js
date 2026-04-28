import express from 'express';
import {
  
  searchAddress,

} from '../controllers/geolocationController.js';

const router = express.Router();

// router.get('/postal-code', getLocationByPostalCode);
router.get('/search', searchAddress);


export default router;
