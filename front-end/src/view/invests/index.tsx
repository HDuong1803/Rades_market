declare var window: any;
import React from "react";
import { Box, Button, Flex, Heading, SimpleGrid, Spacer, useDisclosure, useToast } from "@chakra-ui/react";
import Sidebar from "@/view/Sidebar/Sidebar";
import { ConnectWallet, WalletInfo, SuccessModal } from "@/components";
import { ethers } from "ethers";
import { IPackage, IRate, IWalletInfo, TOKEN } from "@/_types_";
import { packages } from "@/constants";
import InvestCard from "./components/InvestCard";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { buyICOAction, generateContract } from "@/reduxs/accounts/account.reducers";
import { getToast } from "@/utils";

function InvestView() {
  const dispatch = useAppDispatch();
  const { wallet, buyICO, web3Provider } = useAppSelector((state) => state.account);
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();


  const handleBuyICO = async (pk: IPackage) => {
    try {
      await dispatch(buyICOAction(pk)).unwrap();
      onOpen();
      if (web3Provider)
        await dispatch(generateContract(web3Provider));
    } catch (er) {
      toast(getToast(buyICO.errMsg));
    }
  }


  return (
    <Flex
      w="full"
      flexDirection="column"
      margin="30px"
    >
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10} >
        {packages.map((pk) =>
          <InvestCard
            rate={pk.token === TOKEN.MATIC ? wallet.maticRate : wallet.usdtRate}
            key={pk.key}
            pak={pk}
            isBuying={buyICO.isProcessing && buyICO.key === pk.key}
            onBuy={() => handleBuyICO(pk)}
          />)}
      </SimpleGrid>
      <SuccessModal
        hash={buyICO.has}
        isOpen={isOpen}
        onClose={onClose}
        title="THANK YOU!!"
      />
    </Flex>
  );
}

export default InvestView;
