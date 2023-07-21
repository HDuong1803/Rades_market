import { Market } from '@schemas';

export class MarketService {
  async getList() {
    return await Market.find();
  }
}