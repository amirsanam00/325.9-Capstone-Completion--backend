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
  
  // UPDATE itinerary (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: 'Failed to update itinerary' });
  }
});

// DELETE itinerary
router.delete('/:id', async (req, res) => {
  try {
    await Itinerary.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Itinerary deleted successfully' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: 'Failed to delete itinerary' });
  }
});

export default router;