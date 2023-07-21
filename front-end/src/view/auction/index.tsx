import { IAuctionInfo } from '@/_types_';
import RadesAuction from '@/contracts/RadesAuction';
import RadesNFT from '@/contracts/RadesNFT';
import RadesToken from '@/contracts/RadesToken';
import { useAppSelector } from '@/reduxs/hooks';
import { Flex, SimpleGrid, useBoolean } from '@chakra-ui/react'
import React from 'react'
import NftAuction from './components/Auction';
import AuctionModal from './components/AutionModal';
import { SuccessModal } from '@/components';

export default function AuctionView() {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [nfts, setNfts] = React.useState<IAuctionInfo[]>([]);
  const [nftSelected, setNftSelected] = React.useState<IAuctionInfo>();
  const [isOpen, setIsOpen] = useBoolean();
  const [isAuctionSuccess, setIsAuctionSuccess] = React.useState<boolean>(false);

  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [txHash, setTxHash] = React.useState<string>();
 
  const getListAuctions = React.useCallback(async () => {
    if (!web3Provider) return;
    const radesAuction = new RadesAuction(web3Provider || undefined);
    const nfts = await radesAuction.getAuctionByStatus();
    const radesNFT = new RadesNFT(web3Provider);
    const auctionItems = await radesNFT.getNftAuctionInfo(nfts);  
    setNfts(auctionItems);   
  }, [web3Provider]);

  React.useEffect(() => {
    getListAuctions();
  }, [getListAuctions]);

  const handleAuction =async (bid: number) => {
    if (!web3Provider || !nftSelected) return;
    setIsProcessing(true);
    try {
      const radesAuction = new RadesAuction(web3Provider);
      const radesToken = new RadesToken(web3Provider);
      await radesToken.approve(radesAuction._contractAddress, bid);
      const tx = await radesAuction.joinAuction(nftSelected.auctionId, bid);
      setTxHash(tx);
      setIsAuctionSuccess(true);
      setIsOpen.off();
      await getListAuctions();
    } catch(ex: any) {
      setIsAuctionSuccess(false);
    }
    setIsProcessing(false);  
  }

  return (
    <Flex w="100%">
      <SimpleGrid columns={4} spacing="20px">
        {nfts.map((nft) => (
          <NftAuction item={nft} key={nft.id} onAction={() => {
            setNftSelected(nft);
            setIsOpen.on()
          }} />
        ))}
      </SimpleGrid>

      <AuctionModal
        isOpen={isOpen}
        isProcessing={isProcessing}
        nft={nftSelected}
        onClose={()=>setIsOpen.off()}
        onAuction={(amount) => handleAuction(amount)}          
      />

      <SuccessModal 
        hash={txHash}
        title="SUCCESS"
        isOpen={isAuctionSuccess}
        onClose={() => setIsAuctionSuccess(false)}
      />
    </Flex>
  );
}
