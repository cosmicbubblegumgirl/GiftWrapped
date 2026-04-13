/* jshint esversion: 11, node: true */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');
const { userStore } = require('../data/store');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

function signToken(user) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET env var is required.');
  }

  return jwt.sign(
    {
      id: String(user._id || user.id || user.email),
      email: user.email,
      name: user.name
    },
    jwtSecret,
    { expiresIn: '7d' }
  );
}

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const database = await connectToDatabase();

    if (database) {
      const collection = database.collection('users');
      const existingUser = await collection.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const result = await collection.insertOne({ name, email, password: passwordHash, wishlist: [] });
      const createdUser = await collection.findOne({ _id: result.insertedId });

      return res.status(201).json({
        token: signToken(createdUser),
        user: {
          id: String(createdUser._id),
          name: createdUser.name,
          email: createdUser.email,
          wishlist: createdUser.wishlist || []
        }
      });
    }

    const existingUser = userStore.find((user) => user.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const createdUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: await bcrypt.hash(password, 10),
      wishlist: []
    };
    userStore.push(createdUser);

    return res.status(201).json({
      token: signToken(createdUser),
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        wishlist: createdUser.wishlist
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const database = await connectToDatabase();

    if (database) {
      const collection = database.collection('users');
      const user = await collection.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      return res.status(200).json({
        token: signToken(user),
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          wishlist: user.wishlist || []
        }
      });
    }

    const user = userStore.find((entry) => entry.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    return res.status(200).json({
      token: signToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/profile', protect, async (req, res, next) => {
  try {
    const database = await connectToDatabase();

    if (database) {
      const collection = database.collection('users');
      let currentUser = null;

      if (ObjectId.isValid(req.user.id)) {
        currentUser = await collection.findOne({ _id: new ObjectId(req.user.id) });
      }

      if (!currentUser) {
        currentUser = await collection.findOne({ email: req.user.email });
      }

      if (!currentUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.status(200).json({
        id: String(currentUser._id),
        name: currentUser.name,
        email: currentUser.email,
        wishlist: currentUser.wishlist || []
      });
    }

    const currentUser = userStore.find((entry) => entry.id === req.user.id || entry.email === req.user.email);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      wishlist: currentUser.wishlist || []
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
