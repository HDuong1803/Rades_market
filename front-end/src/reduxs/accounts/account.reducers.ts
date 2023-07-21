import { IPackage, IWalletInfo, TOKEN } from "@/_types_"
import { createAction, createAsyncThunk, createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ethers } from "ethers";
import { RootState } from "../store";
import RadesICO from "@/contracts/RadesICO";
import UsdtContract from "@/contracts/USDT";
import RadesToken from "@/contracts/RadesToken";
import RadesStake, { IStakeInfo } from "@/contracts/RadesStake";

export const setProvider = createAction<ethers.providers.Web3Provider>(
  "account/setProvider"
);

export interface AccountState {
  wallet: IWalletInfo;
  web3Provider?: ethers.providers.Web3Provider;
  convert: {
    isLoading: boolean;
    hash: string;
    errorMsg: string;
  },
  buyICO: {
    isProcessing: boolean;
    has: string,
    key: string,
    errMsg: string;
  },
  stakeInfo?: IStakeInfo;
}

const initialState: AccountState = {
  wallet: {
    radtBalance: 0,
    address: '',
    maticBalance: 0,  
    maticRate: 0,
    usdtRate: 0,  
  },
  convert: {
    isLoading: false,
    hash: '',
    errorMsg: '',
  },
  buyICO: {
    isProcessing: false,
    has: '',
    key: '',
    errMsg: '',
  },  
}

export const generateContract = createAsyncThunk<
  IWalletInfo,
  ethers.providers.Web3Provider
>("account/generateContract", async (provider) => {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const balance = await signer.getBalance();
  const matic = Number.parseFloat(ethers.utils.formatEther(balance));
  const radesToken = new RadesToken(provider);
  const radtBalance = await radesToken.balanceOf(address);
  const radesICO = new RadesICO(provider);
  const maticRate = await radesICO.getMaticRate();
  const usdtRate = await radesICO.getUsdtRate();
  return { address, maticBalance: matic, radtBalance, maticRate, usdtRate };
});

export const buyICOAction = createAsyncThunk<string, IPackage, {
  state: RootState
}>(
  "account/buyIco",
  async (pk, {getState}) => {
      const {web3Provider, wallet } = getState().account;
      if (!web3Provider) throw new Error("Error");
      const radesICO = new RadesICO(web3Provider);
      if (pk.token === TOKEN.USDT) {
        const usdtContract = new UsdtContract(web3Provider);
        await usdtContract.approve(radesICO._contractAddress, pk.amount / wallet.usdtRate);
        const hash = await radesICO.buyTokenByUSDT(pk.amount / wallet.usdtRate);
        return hash;
      } else {
        const hash = await radesICO.buyTokenByMATIC(pk.amount / wallet.maticRate);
        return hash;
      }
  }
);

export const getStakeInfoAction = createAsyncThunk<IStakeInfo>("account/getStakeInfo",
  async () => {
      const radesStake = new RadesStake();
      const info  = await radesStake.getStakeInfo();
      return info;
  }
);

export const accountReducer = createReducer(initialState, (builder) => {
  builder.addCase(setProvider, (state, { payload }) => {
    state.web3Provider  = payload;    
  }); 

  //generate contract
  builder.addCase(generateContract.fulfilled, (state, {payload}) => {
      state.wallet = payload;
  });
  builder.addCase(generateContract.rejected, (state, action) => {
    const {error} = action;
    state.convert = {...state.convert, isLoading: false, errorMsg: error.message || "Error"}
  });

  //buy ico
  builder.addCase(buyICOAction.pending, (state, {meta}) => {    
    const {arg} = meta;
    state.buyICO = {...state.buyICO, isProcessing: true, has: '', key: arg.key};
  });
  builder.addCase(buyICOAction.rejected, (state, {error}) => {
    state.buyICO= {...state.buyICO, isProcessing: false, errMsg: error.message || "Error"};
  });
  builder.addCase(buyICOAction.fulfilled, (state, {payload}) => {
    state.buyICO= {...state.buyICO, isProcessing: false, errMsg: '', has: payload};
  });

  //staking
  builder.addCase(getStakeInfoAction.fulfilled, (state, {payload})  => {
    state.stakeInfo = payload;
  });
})




