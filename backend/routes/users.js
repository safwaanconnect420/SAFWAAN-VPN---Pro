import express from 'express';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get Current User
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  res.json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      subscription: user.subscription,
      devices: user.devices,
      preferences: user.preferences,
      stats: user.stats,
      createdAt: user.createdAt
    }
  });
}));

// Update User Profile
router.put('/me', authenticate, asyncHandler(async (req, res) => {
  const { fullName, avatar, preferences } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      fullName,
      avatar,
      preferences: { ...user.preferences, ...preferences },
      updatedAt: new Date()
    },
    { new: true }
  );

  res.json({
    success: true,
    message: 'Profile updated',
    user
  });
}));

// Update Password
router.put('/me/password', authenticate, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.userId).select('+password');

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password updated successfully'
  });
}));

// Get User Stats
router.get('/stats', authenticate, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  res.json({
    success: true,
    stats: {
      subscription: user.subscription,
      devices: user.devices,
      dataUsed: user.stats.totalDataUsed,
      connections: user.stats.connectionsCount,
      joinedDate: user.createdAt
    }
  });
}));

// Add Device
router.post('/devices', authenticate, asyncHandler(async (req, res) => {
  const { name, os, ip } = req.body;

  const user = await User.findById(req.userId);

  if (user.devices.current >= user.devices.max) {
    return res.status(400).json({ error: 'Maximum devices limit reached' });
  }

  user.devices.list.push({
    name,
    os,
    lastUsed: new Date(),
    ip
  });
  user.devices.current = user.devices.list.length;
  await user.save();

  res.json({
    success: true,
    message: 'Device added',
    devices: user.devices
  });
}));

// Remove Device
router.delete('/devices/:id', authenticate, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  
  user.devices.list = user.devices.list.filter(d => d._id.toString() !== req.params.id);
  user.devices.current = user.devices.list.length;
  await user.save();

  res.json({
    success: true,
    message: 'Device removed',
    devices: user.devices
  });
}));

export default router;