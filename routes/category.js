const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

function validateCategory(req, res, next) {
  const { name, level } = req.body;
  if (!name || !level) {
    return res.status(500).json({ error: 'Name and level are required.' });
  }
  next();
}

// 1. POST: Add category
router.post('/',validateCategory, async (req, res) => {
  try {
    const{name,level,parentCategory}=req.body;
    const existing =await Category.findOne({name,level}).lean();
    if(existing){
      return res.status(409).json({message:'category already exisits.'});
    }

    const category = new Category({name,level,parentCategory:parentCategory|| null});
    
    await category.save();

    res.status(201).json({message:'cateogry saved sucessfully', category});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. GET: All categories or filter by level or parent
router.get('/', async (req, res) => {
  try {
    const { level, parentCategory } = req.query;
    const query = {};
    if (level) query.level = parseInt(level);
    if (parentCategory) query.parentCategory = parentCategory;

    const categories = await Category.find(query).lean();

    if(categories.length==0){
      return res.status(404).json({message:'no categories found'});
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// 3. PUT: Update a category
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
