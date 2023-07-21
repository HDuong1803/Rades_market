import { useAppSelector } from "@/reduxs/hooks";
import { VStack, Text, HStack, Button } from "@chakra-ui/react";
import React from "react";

interface IProps {
    name: string;
    apr: number;
    duration: number;
    onStack?: () => void;
}

export default function StakeItem({ name, apr, duration, onStack }: IProps) {
    const { wallet } = useAppSelector((state) => state.account);
    const color = name === "GOLD" ? "rgb(255 171 0)" : "#fff";
    return (
        <VStack
            my={{ base: '10px', lg: "30px" }}
            mx={{ base: "10px", lg: '30px' }}
            bg="rgba(0,0,0,0.2)"
            w="110%"

            borderRadius="16px"
            px="46px"
            py="30px"
            border="1px solid rgba(255,255,255, 0.2)"
        >
            <Text
                variant="notoSan"
                fontSize="68px"
                my="40px !important"
                color={color}
            >
                {name}
            </Text>
            <HStack
                w={{ base: "100%" }}
                justifyContent="space-between"
                my="10px !important"
            >
                <Text variant="smSan" color="#ccc" fontSize="24px">
                    APR%:
                </Text>
                <Text variant="notoSan" fontSize="20px" color="white">
                    {apr}%
                </Text>
            </HStack>
            <HStack
                my="25px !important"
                w={{ base: "100%" }}
                justifyContent="space-between"
            >
                <Text variant="smSan" color="#ccc" fontSize="24px">
                    DURATION:
                </Text>
                <Text variant="notoSan" fontSize="24px" color="white">
                    {duration} DAYS
                </Text>
            </HStack>
            <HStack
                my="15px !important"
                w={{ base: "100%" }}
                justifyContent="space-between"
            >
                <Text variant="smSan" color="#ccc" fontSize="24px">
                    TYPE:
                </Text>
                <Text variant="notoSan" fontSize="24px" color="white">
                    LOCK
                </Text>
            </HStack>
            <HStack
                my="15px !important"
                w={{ base: "100%" }}
                justifyContent="space-between"
            >
                <Text variant="smSan" color="#ccc" fontSize="24px">
                    MAX CAP:
                </Text>
                <Text variant="notoSan" fontSize="24px" color="white">
                    20,000,000 RADT
                </Text>
            </HStack>
            <Button
                disabled={!wallet.address}
                fontSize="20px"
                variant="secondary"
                w="full"
                py="25px"
                mt="20px !important"
                fontWeight="bold"
                onClick={onStack}
            >
                STAKE NOW
            </Button>
        </VStack>
    );
}