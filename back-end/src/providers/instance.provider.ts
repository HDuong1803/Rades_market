import { IpfsService } from '@app/ipfs/ipfs.service';
import { MarketService } from '@app/market/market.service';
import { UserService } from '@app/user/user.service';

class Singleton {
  private static userInstance: UserService;
  private static marketInstance: MarketService;
  private static ipfsInstance: IpfsService;

  public static getUserInstance(): UserService {
    if (!Singleton.userInstance) {
      Singleton.userInstance = new UserService();
    }
    return Singleton.userInstance;
  }
  public static getMarketInstance(): MarketService {
    if (!Singleton.marketInstance) {
      Singleton.marketInstance = new MarketService();
    }
    return Singleton.marketInstance;
  }
  public static getIpfsInstance(): IpfsService {
    if (!Singleton.ipfsInstance) {
      Singleton.ipfsInstance = new IpfsService();
    }
    return Singleton.ipfsInstance;
  }
}

export { Singleton };