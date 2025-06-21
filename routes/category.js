const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// 1. POST: Add category
router.post('/', async (req, res) => {
  try {
    const newCat = new Category(req.body);
    const saved = await newCat.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. GET: All categories or filter by level or parent
router.get('/', async (req, res) => {
  try {
    const { level, parentCategory } = req.query;
    const query = {};
    if (level) query.level = parseInt(level);
    if (parentCategory) query.parentCategory = parentCategory;

    const cats = await Category.find(query);
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PUT: Update a category
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. DELETE: Remove category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted', id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
