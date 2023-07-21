import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";
import { BaseInterface, ERC20 } from "./interfaces";
import { getRadesVaultAbi } from "./utils/getAbis";
import { getRadesVaultAddress } from "./utils/getAddress";

class RadesVault extends BaseInterface {
  constructor(provider: ethers.providers.Web3Provider) {      
      super(provider, getRadesVaultAddress(), getRadesVaultAbi())
  }

  async deposit(amount: number) {   
    const amountToEth = ethers.utils.parseEther(`${amount}`);
    const tx: TransactionResponse = await this._contract.deposit(amountToEth);
    return this._handleTransactionResponse(tx);
  }

}

export default RadesVault;