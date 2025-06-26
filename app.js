const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/category');
const cors = require('cors');




const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/categorydb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



app.use('/api/categories', categoryRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

