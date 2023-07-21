import { Flex, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import StakeItem from './components/StakeItem';
import { useAppDispatch, useAppSelector } from '@/reduxs/hooks';
import MyLockedStaking from './components/MyLockedStaking';
import { getStakeInfoAction } from '@/reduxs/accounts/account.reducers';
import StakingModal from './components/StakingModal';
import { SuccessModal } from '@/components';

function StakingView() {
  const dispatch = useAppDispatch();
  const { stakeInfo } = useAppSelector((state) => state.account);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [stakeType, setStakeType] = useState<"GOLD" | "SILVER">("SILVER");
  const [txHash, setTxHash] = useState<string>();
  const {
    isOpen: isSuccessModal,
    onClose: onCloseSuccessModal,
    onOpen: onOpenSuccessModal,
  } = useDisclosure();

  const getStakeInfo = useCallback(() => {
    dispatch(getStakeInfoAction());
  }, [dispatch]);

  React.useEffect(() => {
    getStakeInfo();
  }, [getStakeInfo]);

  const handleStakeSuccess = useCallback(
    (hash: string) => {
      setTxHash(hash);
      getStakeInfo();
      onOpenSuccessModal();
      onClose();
    },
    [getStakeInfo, onClose, onOpenSuccessModal]
  );


  return (
    <Flex w="full" margin="20px">
      <Tabs>
        <TabList borderBottomColor="#5A5A5A" borderBottomRadius={2} mx="15px">
          <Tab color="#5A5A5A"
            _selected={{ borderBottomColor: "white", color: "white" }}>
            STAKING
          </Tab>
          <Tab
            color="#5A5A5A"
            _selected={{ borderBottomColor: "white", color: "white" }}
          >
            MY STAKING
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="100px">
              <StakeItem
                name="SILVER"
                apr={90}
                duration={14}
                onStack={() => {
                  setStakeType("SILVER");
                  onOpen();
                }}
              />
              <StakeItem
                name="GOLD"
                apr={120}
                duration={30}
                onStack={() => {
                  setStakeType("GOLD");
                  onOpen();
                }}
              />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid w="110%">
              <MyLockedStaking tranHash={txHash}/>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <StakingModal
        isOpen={isOpen}
        stakeType={stakeType}
        onClose={onClose}
        onSuccess={(hash) => handleStakeSuccess(hash)}
      />

      <SuccessModal
        title="STAKE SUCCESS"
        onClose={onCloseSuccessModal}
        isOpen={isSuccessModal}
        hash={txHash}
      />
    </Flex>
  )
}

export default StakingView