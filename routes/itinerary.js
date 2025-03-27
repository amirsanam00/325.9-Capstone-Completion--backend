import express from "express";
import Itinerary from "../models/Itinerary.js";

const router = express.Router();

// Get all itineraries
router.get('/', async (req, res) => {
    try {
      const itineraries = await Itinerary.find();
      res.json(itineraries);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching itineraries' });
    }
  });
  
  // Save new itinerary
  router.post('/', async (req, res) => {
    try {
      const { city, activities } = req.body;
      const itinerary = new Itinerary({ city, activities });
      await itinerary.save();
      res.status(201).json(itinerary);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving itinerary' });
    }
  });
  

export default router;