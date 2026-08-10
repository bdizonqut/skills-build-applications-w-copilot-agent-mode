import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    totalCalories: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
}, { timestamps: true });
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
