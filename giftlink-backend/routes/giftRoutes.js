/* jshint esversion: 11, node: true */
const express = require('express');
const { connectToDatabase } = require('../models/db');
const { giftStore } = require('../data/store');
const { filterGifts } = require('../lib/filterGifts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const database = await connectToDatabase();

    if (database) {
      const collection = database.collection('gifts');
      const dbGifts = await collection.find({}).toArray();
      if (dbGifts.length) {
        return res.status(200).json(filterGifts(dbGifts, req.query));
      }
    }

    return res.status(200).json(filterGifts(giftStore, req.query));
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const database = await connectToDatabase();
    const requestedId = req.params.id;

    if (database) {
      const collection = database.collection('gifts');
      const dbGift = await collection.findOne({
        $or: [{ id: requestedId }, { id: Number(requestedId) }]
      });

      if (dbGift) {
        return res.status(200).json(dbGift);
      }
    }

    const gift = giftStore.find((item) => String(item.id) === String(requestedId));

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    return res.status(200).json(gift);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
