import { logger } from '@constants';
import mongoose from 'mongoose';

async function connectToMongoDB() {
  const { MONGODB_URL } = process.env;
  await mongoose.connect(`${MONGODB_URL}`, {});
  logger.info('Connected to database');
}
export { connectToMongoDB };
