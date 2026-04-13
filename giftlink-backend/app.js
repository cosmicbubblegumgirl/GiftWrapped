/* jshint esversion: 11, node: true */
const path = require('path');
const fs = require('fs');
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
const frontendBuildPath = path.join(__dirname, '..', 'giftlink-frontend', 'build');
const hasFrontendBuild = fs.existsSync(frontendBuildPath);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || frontendUrl === '*') {
      return callback(null, true);
    }

    const allowedOrigin = origin === frontendUrl;
    const localhostOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
    const codespacesOrigin = /^https:\/\/.+\.app\.github\.dev$/i.test(origin);

    if (allowedOrigin || localhostOrigin || codespacesOrigin) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/gifts/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

if (hasFrontendBuild) {
  app.use(express.static(frontendBuildPath));

  app.get(/^\/(?!api|health).*/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      name: 'GiftWrapped API',
      message: 'GiftWrapped backend is running. Build the frontend for single-port hosting.'
    });
  });
}

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
