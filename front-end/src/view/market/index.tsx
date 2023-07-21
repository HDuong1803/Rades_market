import { INftItem } from '@/_types_';
import RadesMarketplace from '@/contracts/RadesMarketplace';
import RadesNFT from '@/contracts/RadesNFT';
import RadesToken from '@/contracts/RadesToken';
import React from 'react'
import MarketNFT from './components/MarketNFT';
import { SimpleGrid, useDisclosure, useToast } from '@chakra-ui/react';
import { useAppSelector } from '@/reduxs/hooks';
import { SuccessModal } from '@/components';
import { getToast } from '@/utils';

function MarketView() {
  const [nfts, setNfts] = React.useState<INftItem[]>([]);
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [currentNft, setCurrentNft] = React.useState<INftItem>();
  const toast = useToast();
  const [txHash, setTxHash] = React.useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const getListedNfts = React.useCallback(async () => {
    try {
      const radesMarketplace = new RadesMarketplace();
      const radesNFT = new RadesNFT();
      const listedList = await radesMarketplace.getNFTListedOnMarketplace();
      const nftList = await radesNFT.getNftInfo(listedList);
      setNfts(nftList);
    } catch (ex) {}
  }, []);

  React.useEffect(() => {
    getListedNfts();
  }, [getListedNfts]);

  const handleBuy = React.useCallback(async (nft: INftItem) => {    
    if (!web3Provider || !nft.price) return;
    try {
      setCurrentNft(nft);
      const radesMarketplace = new RadesMarketplace(web3Provider);
      const radesToken = new RadesToken(web3Provider);      
      await radesToken.approve(radesMarketplace._contractAddress, nft.price);
      const tx = await radesMarketplace.buyNft(nft.id, nft.price);
      setTxHash(tx);
      onOpen();
    } catch (er: any) {
      toast(getToast(er));
    }
    setCurrentNft(undefined);
  }, [onOpen, toast, web3Provider]);


  return (
    <>
      <SimpleGrid columns={4} spacing="20px" w="100%">
        {nfts.map((nft) => (
          <MarketNFT
            item={nft}
            key={nft.id}
            isDisabled={!wallet}
            isBuying={currentNft?.id === nft.id}
            onAction={() => handleBuy(nft)}
          />
        ))}
      </SimpleGrid>
      <SuccessModal
        title="THANK YOU!!"
        hash={txHash}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default MarketView