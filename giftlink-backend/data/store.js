/* jshint esversion: 11, node: true */
const bcrypt = require('bcryptjs');
const gifts = require('./gifts');

const giftStore = [...gifts];
const userStore = [
  {
    id: 'demo-user-1',
    name: 'Demo Gifter',
    email: 'demo@giftwrapped.local',
    password: bcrypt.hashSync('password123', 10),
    wishlist: ['gift-001', 'gift-008', 'gift-024']
  }
];

module.exports = {
  giftStore,
  userStore
};
