import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  city: String,
  activities: [String]
});

export default mongoose.model('Itinerary', itinerarySchema);
