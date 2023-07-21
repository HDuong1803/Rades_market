import { INftItem, ActionType } from "@/_types_";
import {
  Flex,
  Image,
  Box,
  Text,
  HStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  item: INftItem;
  index: number;
  isUnList?: boolean;
  isList?: boolean;
  isAuction?: boolean;
  onAction?: (action: ActionType) => void;
}

export default function Nft({
  item,
  isAuction,
  isList,
  isUnList,
  onAction,
}: IProps) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg="#151D14"
      px="10px"
      py="10px"
      borderRadius="10px"
    >
      <Box position="relative">
        <Image
          src={item.image}
          alt={item.name}
          objectFit="cover"
          borderRadius="10px"
        />
        <HStack bg="rgba(0,0,0,0.4)" position="absolute" top={5} px="10px">
          <Text>ID: {item.id.toString().padStart(5, "0")}</Text>
        </HStack>
      </Box>
      <Text fontWeight="bold" py="10px" color="white" fontSize="20px" textTransform="uppercase" letterSpacing="5px">
        {item.name}
      </Text>
      {isList && isAuction && (
        <SimpleGrid w="full" columns={2} spacingX="10px">
          <Button
            variant="secondary"
            onClick={() => onAction && onAction("LIST")}
          >
            List
          </Button>
          <Button
            variant="secondary"
            onClick={() => onAction && onAction("AUCTION")}
          >
            Auction
          </Button>
        </SimpleGrid>
      )}
      {isUnList && (
        <Button
          variant="secondary"
          w="full"
          onClick={() => onAction && onAction("UNLIST")}
        >
          UnList
        </Button>
      )}
    </Flex>
  );
}
