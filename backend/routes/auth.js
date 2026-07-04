import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Register
router.post('/register', asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const user = new User({
    username,
    email,
    password,
    fullName: fullName || username
  });

  await user.save();

  const token = generateToken(user._id);

  res.status(201).json({
    message: 'Account created successfully',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName
    }
  });
}));

// Login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user._id);

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      subscription: user.subscription,
      preferences: user.preferences
    }
  });
}));

// Verify Token
router.get('/verify', asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    const user = await User.findById(decoded.userId);

    res.json({
      valid: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
}));

// Guest Login (Demo)
router.post('/guest', asyncHandler(async (req, res) => {
  const guestToken = jwt.sign(
    { userId: 'guest', role: 'guest' },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Guest access granted',
    token: guestToken,
    user: {
      id: 'guest',
      username: 'Guest User',
      email: 'guest@safwaan-vpn.local',
      subscription: { plan: 'free' }
    }
  });
}));

export default router;