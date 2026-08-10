import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    exercises: [{ type: String }],
    duration: { type: Number, required: true },
    targetMuscles: [{ type: String }],
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
