import { ABI_MARKET } from '@constants';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract/types/index';

const web3 = new Web3(`${process.env.NETWORK_RPC}`);

const newContract = (abi: any, address: string): Contract => {
  return new web3.eth.Contract(abi, address);
};

const getBlockByNumber = async (blockNumber: number) => {
  return await web3.eth.getBlock(blockNumber);
};

const marketContract = newContract(ABI_MARKET.RadesMarketplace.abi, ABI_MARKET.RadesMarketplace.address);

export { web3, newContract, marketContract, getBlockByNumber };