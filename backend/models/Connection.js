import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  configId: { type: mongoose.Schema.Types.ObjectId, ref: 'Config', required: true },
  deviceId: String,
  deviceName: String,
  protocol: String,
  region: String,
  startTime: { type: Date, default: Date.now },
  endTime: Date,
  duration: Number, // seconds
  dataUsed: { type: Number, default: 0 }, // bytes
  ipAddress: String,
  status: {
    type: String,
    enum: ['active', 'completed', 'failed', 'disconnected'],
    default: 'active'
  },
  errorLog: String,
  connectionQuality: {
    latency: Number,
    packetLoss: Number,
    bandwidth: Number
  }
}, { timestamps: true });

export default mongoose.model('Connection', connectionSchema);