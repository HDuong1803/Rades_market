import Sidebar from "@/view/Sidebar/Sidebar";
declare var window: any;
import { ConnectWallet, WalletInfo } from "@/components";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: IProps) {
  const router = useRouter();
  console.log(router.pathname);

  const dispatch = useAppDispatch();
  const { wallet } = useAppSelector((state) => state.account);

  const onConnectMetamask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        undefined
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await signer.getBalance();
      const maticBalance = Number.parseFloat(
        ethers.utils.formatEther(bigBalance)
      );
    }
  };
  return (
    <Flex className="layout"
    >
      <Sidebar />
      {children}
      <Spacer />
      <Flex margin="20px">
      {!wallet.address && (
        <ConnectWallet display={{ base: "none", lg: "block" }} />
      )}
      {wallet.address && (
        <WalletInfo display={{ base: "none", lg: "flex"}} />
      )}
      </Flex>
    </Flex>
  );
}
