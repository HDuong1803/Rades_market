import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils/common";
import { getRadesICOAbi } from "./utils/getAbis";
import { getRadesICOAddress } from "./utils/getAddress";

export default class RadesICO extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getRadesICOAddress(), getRadesICOAbi());
    if (!provider) {
      this._contract = new ethers.Contract(this._contractAddress,  this._abis, rpcProvider);
    }
  }

  async getMaticRate(): Promise<number> {
    let rate = await this._contract.MATIC_rate();
    return this._toNumber(rate);
  }

  async getUsdtRate(): Promise<number> {
    const rate = await this._contract.USDT_rate();
    return this._toNumber(rate);
  }

  async buyTokenByMATIC(amount: number) {
    const rate = await this.getMaticRate();
    const tx: TransactionResponse = await this._contract.buyTokenByMATIC({
      ...this._option,
      value: this._numberToEth(amount/rate),
    });
    return this._handleTransactionResponse(tx);
  }

  async buyTokenByUSDT(amount: number) {
    const rate = await this.getUsdtRate();
    const test = amount / rate;
    const tx: TransactionResponse = await this._contract.buyTokenByUSDT(
      this._numberToEth(amount/rate),
      this._option
    );
    return this._handleTransactionResponse(tx);
  }
}