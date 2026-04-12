/* jshint esversion: 11, node: true */
require('dotenv').config();
const { connectToDatabase, client } = require('../models/db');
const gifts = require('../data/gifts');

async function run() {
  const database = await connectToDatabase();

  if (!database) {
    console.log('MongoDB unavailable. Set MONGO_URI in .env first.');
    return;
  }

  const collection = database.collection('gifts');
  await collection.deleteMany({});
  const result = await collection.insertMany(gifts);
  console.log(`Inserted ${Object.keys(result.insertedIds).length} documents into MongoDB.`);
  await client.close();
}

run().catch(async (error) => {
  console.error(error);
  await client.close();
  process.exit(1);
});
