require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger');

const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorHandler');

// Routes
const routes = require('./routes');
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.raw({ limit: '100mb' }));
// Increase multipart/form-data limit

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors());
app.use('/uploads', express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100
});
app.use('/api/', limiter);

// Routes
app.use('/api', routes);

// Auth Routes
app.use("/api/auth", authRoutes);

// Swagger UI endpoint
app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling
app.use(errorHandler);

// Database connection
const isDevelopment = process.env.NODE_ENV === 'development'
const mongoUri = process.env.MONGODBURI;

mongoose.connect(mongoUri, { dbName: isDevelopment ? 'face-swap-ai-development' : 'face-swap-ai' })
  .then(() => console.log(`Connected to MongoDB - ${isDevelopment ? 'face-swap-ai-development' : 'face-swap-ai'}`))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 4355;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});