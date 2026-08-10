import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking'] },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    distance: { type: Number, default: 0 },
    description: { type: String, default: '' },
    date: { type: Date, required: true },
}, { timestamps: true });
export const Activity = mongoose.model('Activity', activitySchema);
