import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  teamId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
