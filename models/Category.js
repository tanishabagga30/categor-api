const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  level: { type: Number, enum: [1, 2, 3], required: true }
});

module.exports = mongoose.model('Category', CategorySchema);
