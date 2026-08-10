import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  difficulty: string;
  exercises: string[];
  duration: number;
  targetMuscles: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    exercises: [{ type: String }],
    duration: { type: Number, required: true },
    targetMuscles: [{ type: String }],
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
