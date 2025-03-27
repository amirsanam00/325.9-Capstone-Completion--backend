import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: 'Message saved successfully.' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
  router.get('/', async (req, res) => {
    try {
      const messages = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve messages.' });
    }
  });
  
  
});

export default router;