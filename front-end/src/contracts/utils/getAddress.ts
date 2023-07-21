import getChainIdFromEnv, { AddressType, SMART_ADDRESS } from "./common";

const getAddress = (address: AddressType) => {
  const CHAIN_ID = getChainIdFromEnv() as keyof AddressType ;
  return address[CHAIN_ID]
};

export const getRadesICOAddress = () => getAddress(SMART_ADDRESS.RADES_ICO);
export const getUsdtAddress = () => getAddress(SMART_ADDRESS.USDT);
export const getRadesNFTAddress = () => getAddress(SMART_ADDRESS.RADES_NFT);
export const getRadesMarketplaceAddress = () => getAddress(SMART_ADDRESS.RADES_MARKETPLACE);
export const getRadesTokenAddress = () => getAddress(SMART_ADDRESS.RADES_TOKEN);
export const getRadesAuctionAddress = () => getAddress(SMART_ADDRESS.RADES_AUCTION);
export const getRadesStakeAddress = () => getAddress(SMART_ADDRESS.RADES_STAKE);
export const getRadesVaultAddress = () => getAddress(SMART_ADDRESS.RADES_VAULT);