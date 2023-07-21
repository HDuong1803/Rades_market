import { ethers } from "ethers";
import { BaseInterface, ERC20 } from "./interfaces";
import { getUSDTAbi } from "./utils/getAbis";
import { getUsdtAddress } from "./utils/getAddress";

export default class UsdtContract extends ERC20 {
  constructor(provider: ethers.providers.Web3Provider) {
    super(provider, getUsdtAddress(), getUSDTAbi());
  }
}