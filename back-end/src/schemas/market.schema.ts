import mongoose, { Schema } from 'mongoose';

export interface IMarket {
  token_id: string;
  name: string;
  image: string;
  description: string;
  owner: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const marketSchema = new Schema<IMarket>({
  token_id: { type: String, required: true, unique: true },
  image: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
  name: { type: String, required: false, default: 'Unnamed' },
  owner: { type: String, required: false, default: '' },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Market = mongoose.model('market', marketSchema, undefined, {
  overwriteModels: true,
});