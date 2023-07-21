import mongoose, { Schema } from 'mongoose';

export interface ISynchronize {
  last_block_number: number;
  transactions: string[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const synchronizeSchema = new Schema<ISynchronize>({
  last_block_number: { required: true, type: Number, unique: true },
  transactions: { type: Schema.Types.Mixed, default: [] },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const Synchronize = mongoose.model('Synchronize', synchronizeSchema, undefined, {
  overwriteModels: true,
});
