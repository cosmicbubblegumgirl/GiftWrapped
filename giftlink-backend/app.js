/* jshint esversion: 11, node: true */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const logger = require('./logger');
const { connectToDatabase } = require('./models/db');

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
  origin: frontendUrl === '*' ? true : frontendUrl,
  credentials: true
}));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'GiftWrapped API',
    message: 'GiftWrapped backend is running.'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/gifts/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  logger.error(err && err.stack ? err.stack : err);
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({
    error: 'Internal server error',
    details: err && err.message ? err.message : 'Unknown error'
  });
});

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    logger.info(`GiftWrapped backend listening on port ${port}`);
  });
}

startServer();
