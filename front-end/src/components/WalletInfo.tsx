import {
  Flex,
  HStack,
  Text,
  StackProps,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useMediaQuery, 
} from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../reduxs/hooks";
import { numberFormat, showSortAddress } from "../utils";

export interface IProps extends StackProps {}

const WalletInfo = ({ ...props }: IProps) => {
  const { wallet } = useAppSelector((state) => state.account);
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  if (isLargerThan1280) {
    return (
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button} >
              {showSortAddress(wallet.address)}
            </MenuButton>
            <MenuList>
              <MenuItem justifyContent="space-between">
                MATIC:{" "}
                <Text variant="dmSan" ml="20px">
                  {" "}
                  {numberFormat(wallet.maticBalance)}
                </Text>
              </MenuItem>
              <MenuItem justifyContent="space-between">
                RADT:{" "}
                <Text variant="dmSan" ml="20px">
                  {" "}
                  {numberFormat(wallet.radtBalance)}
                </Text>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    );
  }
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      bg="bg.primary"
      py="10px"
      mx="20px !important"
      px="20px"
      borderRadius="10px"
      fontWeight="bold"
      {...props}
    >
      <Text>{showSortAddress(wallet.address)}</Text>
      <Text>MATIC: {numberFormat(wallet.maticBalance)}</Text>
      <Text>RADT: {numberFormat(wallet.radtBalance)}</Text>
    </Stack>
  );
};

export default WalletInfo;