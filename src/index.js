require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100
});
app.use('/api/', limiter);

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Database connection
const mongoUri = process.env.MONGODBURI;
mongoose.connect(mongoUri, { dbName: 'child-book-ai' })
  .then(() => console.log('Connected to MongoDB - child-book-ai'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});