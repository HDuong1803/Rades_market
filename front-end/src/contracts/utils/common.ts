export type AddressType  = {
    80001: string;
  }
  
  export enum CHAIN_ID {
    TESTNET = 80001,
  }
  
  export default function getChainIdFromEnv(): number {
    const env = process.env.NEXT_PUBLIC_CHAIN_ID;
    if (!env) { return 80001;}
    return parseInt(env);
  }
  
  
  export const getRPC = () => {
    return process.env.NEXT_PUBLIC_RPC_TESTNET;
  }

  export const SMART_ADDRESS = {
    RADES_ICO: {80001: '0x384f1b195C64eFDbc4CfeAd57c4aEfBc61b858A0'},
    USDT: {80001: '0xbdc740051c68E8720BF6D35B6Ef17e94c20C0E5E'},
    RADES_NFT: {80001: '0xF2Ce65837B9B29e0d9A02f81D17eA6661DEacd5E'},
    RADES_MARKETPLACE: {80001: '0x7b1b787335Ed5b9ac5765DC5187f7591755162C3'}, 
    RADES_TOKEN : {80001: '0x8cA466eF834b9050e2E86d2AD124490f596f643f'},
    RADES_AUCTION: {80001: '0xe7d25D2880f9324B57fe5da7d9Ea317196339153'},
    RADES_STAKE: {80001: '0x92f03747D9FD135B5793844976b77353f3d78B19'},
    RADES_VAULT: {80001: '0xaEBA18C81d93D707e61E48973676FA84826ea26E'}
  }