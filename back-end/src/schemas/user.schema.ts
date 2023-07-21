import mongoose, { Schema } from 'mongoose';

export interface IUser {
  wallet_address: string;
  name: string;
  avatar: string;
  description: string;
  private_key: string;
  stealth_address: {
    address: string;
    from: string;
  }[];
  ids: string[];
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const userSchema = new Schema<IUser>({
  wallet_address: { type: String, required: true, unique: true },
  private_key: { type: String, required: false, default: '' },
  name: { type: String, required: false, default: 'Unnamed' },
  avatar: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
  stealth_address: { type: Schema.Types.Mixed, default: [] },
  ids: { type: Schema.Types.Mixed, default: [] },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const User = mongoose.model('user', userSchema, undefined, {
  overwriteModels: true,
});
