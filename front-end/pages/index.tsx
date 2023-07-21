import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import type { NextPage } from 'next';
import BaseLayout from "@/layouts/BaseLayout";
import MarketView from "@/view/market";
import { Divider, Flex, Heading } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  return (
     <Flex w="full" direction="column" margin="20px">
      <Heading color="#55638d">Market</Heading>
      <Divider my="10px" />
       <MarketView />
     </Flex>
  );
};

export default Home;
