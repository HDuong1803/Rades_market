import { IPackage, IWalletInfo } from "@/_types_";
import { useAppSelector } from "@/reduxs/hooks";
import { numberFormat } from "@/utils";
import { Box, Image, Text, Button, HStack, Spinner, Spacer } from "@chakra-ui/react";
import React, { memo } from "react";

interface IProps {
  pak: IPackage;
  rate: number;
  isBuying: boolean;
  onBuy?: () => void;
}

const InvestCard = ({ pak, rate = 1, isBuying, onBuy }: IProps) => {
  const { wallet } = useAppSelector((state) => state.account);
    return (
      <Box
        w="300px"
        h="330px"
        bg="bg.secondary"
        borderRadius="16px"
        overflow="hidden"
        padding="6px"
        border="2px solid #55638d" 
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        
        <Box
          bgImage={`/${pak.bg}`}
          w="full"
          h="120px"
          borderRadius="16px"
          bgSize="cover"
          bgPos="center"
          
        />
  
      <Box
          w="80px"
          h="80px"
          margin="0px auto"
          borderRadius="full"
          marginTop="-60px"
          position="relative"
          marginBottom="10px"
        >
          <Image
            src={`/${pak.icon}`}
            alt="matic"
            w="80px"
            h="80px"
            borderRadius="full"
            objectFit="cover"
            border="5px solid #55638d"
          />
          <Image
            src="/verified.svg"
            w="50px"
            alt="verified"
            position="absolute"
            bottom="-20px"
            right="-10px"
          />
        </Box>
      <Button
        disabled
        variant="primary"
        
        bg="transparent"
        border="1px solid #fff"
        color="rgba(255,255,255, 0.7)"
      >
        {numberFormat(pak.amount)} RADT
      </Button>
      <HStack my="15px">
        <Text color="gray">Amount of coins to pay: </Text>
        <Text variant="notoSan" fontSize="16px" color="white">
          {numberFormat(pak.amount / rate)} {pak.token}
        </Text>
      </HStack>
      <Button w="full" variant="primary" disabled={!wallet?.address || isBuying} onClick={onBuy}>
        {isBuying ? <Spinner /> : 'Buy Now'}        
      </Button>
      </Box>
    );
  }

  export default memo(InvestCard);