import { ethers } from "ethers";
import { BaseInterface, ERC20 } from "./interfaces";
import { getRadesTokenAbi } from "./utils/getAbis";
import { getRadesTokenAddress } from "./utils/getAddress";

export default class RadesToken extends ERC20 {
  constructor(provider: ethers.providers.Web3Provider) {
    super(provider, getRadesTokenAddress(), getRadesTokenAbi());
  }
}