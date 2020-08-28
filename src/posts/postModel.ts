import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../users/userModel';

export interface IPost extends Document {
  author: IUser['_id'];
  createdAt: Date;
  password: string;
}

const PostSchema: Schema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default mongoose.model<IPost>('Post', PostSchema);
