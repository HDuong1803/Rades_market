import {
    Button,
    Flex,
    Spinner,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useBoolean,
    useToast,
  } from "@chakra-ui/react";
  import React from "react";
  import { SuccessModal } from "../../../components";
import { useAppSelector } from "@/reduxs/hooks";
import { IStakerInfo } from "@/_types_";
import RadesStake from "@/contracts/RadesStake";
import { formatDateYYYYMMDDHHMMSS, getToast, numberFormat } from "@/utils";
  
  export interface IProps {tranHash?: string}
  
  const MyLockedStaking = ({tranHash}: IProps) => {
    const { wallet, web3Provider } = useAppSelector((state) => state.account);
    const [lockedStake, setLockedStake] = React.useState<IStakerInfo[]>([]);
    const [isSuccess, setIsSuccess] = useBoolean();
    const [txHash, setTxHash] = React.useState<string>();
    const [isUnStaking, setIsUnStaking] = React.useState<boolean>(false);
    const [stakedIndex, setStakedIndex] = React.useState<number>(-1);
  
    const toast = useToast();
  
    const handleGetStakerInfo = React.useCallback(async() => {
      if (web3Provider && wallet.address) {
        const radesStake = new RadesStake(web3Provider);
        const rs = await radesStake.getStakerInfo(wallet.address);
        setLockedStake(rs);
      } else {
        setLockedStake([]);
      }
    }, [web3Provider, wallet.address, tranHash]);
  
    React.useEffect(() => {
      handleGetStakerInfo();
    }, [handleGetStakerInfo]);
  
    const handleUnStake = React.useCallback(async(index: number) => {
      if (!web3Provider) return;
      try {
        setStakedIndex(index);
        setIsUnStaking(true);
        const radesStake = new RadesStake(web3Provider);
        const tx = await radesStake.onWithdraw(index);
        setTxHash(tx);
        setIsSuccess.on();
      } catch(er: any) {
        toast(getToast(er?.message || 'something error!'));
      }
      setIsUnStaking(false);
      setStakedIndex(-1);
    }, [setIsSuccess, toast, web3Provider]);
  
    return (
      <Flex flex={1}>
        <TableContainer w="full" >
          <Table  >
            <Thead >
              <Tr>
                <Th color="rgba(255,255,255,0.7)">PACKAGE</Th>
                <Th color="rgba(255,255,255,0.7)">STAKE AMOUNT</Th>
                <Th color="rgba(255,255,255,0.7)">WITHDRAW DATE</Th>
                <Th color="rgba(255,255,255,0.7)">COUNT DOWN</Th>
                <Th color="rgba(255,255,255,0.7)">PROFIT</Th>
                <Th color="rgba(255,255,255,0.7)">TOTAL AMOUNT</Th>
                <Th color="rgba(255,255,255,0.7)">ACTION</Th>
              </Tr>
            </Thead>
            <Tbody bgColor="rgba(255,255,255,0)" color="rgba(255,255,255,0.6)">
              {lockedStake.map((info, index) => {
                return (
                  <Tr key={index} >
                    <Td>
                      <Text>{info.termOption == "14" ? "SILVER" : "GOLD"}</Text>
                    </Td>
                    <Td>
                      <Text>{numberFormat(info.amount)} RADT</Text>
                    </Td>
                    <Td>
                      <Text>
                        {formatDateYYYYMMDDHHMMSS(info.releaseDate)} RADT
                      </Text>
                    </Td>
                    <Td>{info.days}</Td>
                    <Td>{numberFormat(info.rewardDebt)} RADT</Td>
                    <Td>{numberFormat(info.rewardDebt + info.amount)} RADT</Td>
                    <Td>
                      <Button
                      onClick={() => handleUnStake(index)}
                        variant="primary"
                        disabled={info.isRelease || info.isLock}
                        padding="3px 15px"
                        fontSize="12px"
                      >
                       {isUnStaking && index === stakedIndex ? <Spinner /> : 'WITHDRAW'}
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <SuccessModal 
          title="WITHDRAW SUCCESS"
          hash={txHash}
          isOpen={isSuccess}
          onClose={() => setIsSuccess.off()}
        />
      </Flex>
    );
  };
  
  export default MyLockedStaking;