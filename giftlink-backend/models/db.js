/* jshint esversion: 11, node: true */
const { MongoClient } = require('mongodb');
const logger = require('../logger');

const mongoUri = process.env.MONGO_URI || '';
const dbName = process.env.DB_NAME || 'giftwrapped';
const client = new MongoClient(mongoUri || 'mongodb://127.0.0.1:27017/giftwrapped');
let databaseInstance = null;

async function connectToDatabase() {
  if (!mongoUri) {
    logger.warn('No MONGO_URI supplied. Running with in-memory fallback.');
    return null;
  }

  if (databaseInstance) {
    return databaseInstance;
  }

  try {
    await client.connect();
    databaseInstance = client.db(dbName);
    logger.info('Connected to MongoDB');
    return databaseInstance;
  } catch (error) {
    logger.warn('MongoDB connection failed. Falling back to in-memory data.');
    return null;
  }
}

function getClient() {
  return client;
}

module.exports = {
  client,
  connectToDatabase,
  getClient
};
