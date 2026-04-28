import RoofDrawing from '../models/RoofDrawing.js';
import User from '../models/User.js';
import calculatePolygonArea from '../utils/getArea.js';
import calculateSolarEstimate from '../utils/getCost.js';

// This controller return Calculated area of the drawn polygon in square meters and provide an estimate for the solar installation based on the calculated area.

export const createRoofDrawing = async (req, res, next) => {
  try {
    const { userId, address, polygon} = req.body;
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const area = calculatePolygonArea(polygon);
    
    const solarEstimate = calculateSolarEstimate(area);

    const roofDrawing = new RoofDrawing({
      userId,
      address,
      polygon,
      area,
      solarEstimate,
    });

    await roofDrawing.save();


    res.status(201).json({
      area,
      solarEstimate
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



