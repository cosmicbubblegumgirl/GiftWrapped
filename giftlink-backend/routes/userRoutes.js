/* jshint esversion: 11, node: true */
const express = require('express');
const { connectToDatabase } = require('../models/db');
const { userStore } = require('../data/store');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const database = await connectToDatabase();

    if (database) {
      const collection = database.collection('users');
      const users = await collection.find({}, { projection: { password: 0 } }).toArray();
      return res.status(200).json(
        users.map((user) => ({
          id: String(user._id),
          name: user.name,
          email: user.email,
          wishlistCount: (user.wishlist || []).length
        }))
      );
    }

    return res.status(200).json(
      userStore.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        wishlistCount: (user.wishlist || []).length
      }))
    );
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
