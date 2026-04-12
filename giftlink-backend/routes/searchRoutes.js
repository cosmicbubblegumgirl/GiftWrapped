/* jshint esversion: 11, node: true */
const express = require('express');
const { connectToDatabase } = require('../models/db');
const { giftStore } = require('../data/store');
const { filterGifts } = require('../lib/filterGifts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const query_category = req.query.category;
    const database = await connectToDatabase();
    let gifts = giftStore;

    if (database) {
      const collection = database.collection('gifts');
      const dbGifts = await collection.find({}).toArray();
      if (dbGifts.length) {
        gifts = dbGifts;
      }
    }

    const results = filterGifts(gifts, {
      q: req.query.q,
      category: query_category,
      recipient: req.query.recipient,
      occasion: req.query.occasion,
      sort: req.query.sort
    });

    return res.status(200).json({
      total: results.length,
      results
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
