const express = require('express');
const Train = require('../models/Train');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching trains' });
  }
});

router.get('/:from/:to', async (req, res) => {
  try {
    const { from, to } = req.params;
    const trains = await Train.find({ from, to });
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching trains' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Not authorized' });
    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ error: 'Error adding train' });
  }
});


// Admin route to add a new train
router.post('/', authMiddleware, async (req, res) => {
    try {
      if (req.user.role !== 'admin') return res.status(403).json({ error: 'Not authorized' });
      const train = new Train(req.body);
      await train.save();
      res.status(201).json(train);
    } catch (error) {
      res.status(500).json({ error: 'Error adding train' });
    }
  });
  
  // Admin route to update train details
  router.put('/:id', authMiddleware, async (req, res) => {
    try {
      if (req.user.role !== 'admin') return res.status(403).json({ error: 'Not authorized' });
      const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!train) return res.status(404).json({ error: 'Train not found' });
      res.json(train);
    } catch (error) {
      res.status(500).json({ error: 'Error updating train' });
    }
  });

module.exports = router;