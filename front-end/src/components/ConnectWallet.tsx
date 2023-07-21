import React from 'react'
import { Button, ButtonProps} from '@chakra-ui/react';
import { connectToMetamask } from '@/contracts/EthersConnect';

interface IProps extends ButtonProps {}
export default function ConnectWallet({...props}: IProps) { 
    const handleConnect = async () => { await connectToMetamask();}
    return <Button variant='secondary' onClick={handleConnect}{...props} >
    Connect Wallet
  </Button>
}