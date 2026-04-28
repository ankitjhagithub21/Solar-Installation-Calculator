import mongoose from 'mongoose';

const roofDrawingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    address: String,
    lat:Number,
    lng:Number
  },
  polygon: {
    type: [{
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }]
  },
  area: {
    type: Number
  },
  solarEstimate: {
    estimatedCost: Number,
    panelsNeeded: Number,
    estimatedSavings: Number,
    paybackPeriod: Number
  }
},{timestamps:true});


export default mongoose.model('RoofDrawing', roofDrawingSchema);
