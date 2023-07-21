export interface IWalletInfo {
  radtBalance: number;
  maticBalance: number;
  address: string;
  maticRate: number;
  usdtRate: number;
}

export interface IRate {
  usdtRate: number;
  maticRate: number;
}

export enum TOKEN {
  RADT = "RADT",
  MATIC = 'MATIC',
  USDT = 'USDT'
}

export interface IPackage {
  key: string;
  amount: number;
  icon: string;
  bg: string;
  token: TOKEN;
}

export interface IAttribute {
  trait_type: string;
  value: string | number;
}

export interface INftItem {
  id: number;
  name?: string;
  description?: string;
  image: string;
  attributes?: IAttribute[];
  //Listing
  price?: number;
  author?: string;  
}

export type ActionType = "LIST" | "UNLIST" | "AUCTION";

export interface IAuctionInfo extends  INftItem {
  auctionId: number;
  auctioneer: string;
  tokenId: number;
  initialPrice: number;
  previousBidder: string;
  lastBid: number;
  lastBidder: string;
  startTime: number;
  endTime: number;
  completed: boolean;
  active: boolean;
}

export interface IStakerInfo {
  index: number;
  amount: number;
  releaseDate: number;
  isRelease: boolean;
  rewardDebt: number;
  termOption: "14" | "30";
  days: string;
  isLock: boolean;
}