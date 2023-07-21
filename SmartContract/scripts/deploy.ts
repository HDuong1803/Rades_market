import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [deployer] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);

    const RadesToken = await ethers.getContractFactory("RadesToken");
    const radesToken = await RadesToken.deploy();
    console.log('RadesToken address: ', radesToken.address);
    Config.setConfig(network + '.RadesToken', radesToken.address);

    const USDT = await ethers.getContractFactory("USDT");
    const usdt = await USDT.deploy();
    console.log('USDT address: ', usdt.address);
    Config.setConfig(network + '.USDT', usdt.address);

    const RadesNFT = await ethers.getContractFactory("RadesNFT");
    const radesNFT = await RadesNFT.deploy("Rades", "RadesNFT", "https://gateway.pinata.cloud/ipfs/QmXcrUWCfDEC5eXwFTWGqipT51dgGJhq54DgJY3MfoQ3f9/");
    console.log('RadesNFT address: ', radesNFT.address);
    Config.setConfig(network + '.RadesNFT', radesNFT.address);

    const RadesVault = await ethers.getContractFactory("RadesVault");
    const radesVault = await RadesVault.deploy("0x8cA466eF834b9050e2E86d2AD124490f596f643f");
    console.log('RadesVault address: ', radesVault.address);
    Config.setConfig(network + '.RadesVault', radesVault.address);

    const RadesAuction = await ethers.getContractFactory("RadesAuction");
    const radesAuction = await RadesAuction.deploy("0x8cA466eF834b9050e2E86d2AD124490f596f643f" ,radesNFT.address);
    console.log('RadesAuction address: ', radesAuction.address);
    Config.setConfig(network + '.RadesAuction', radesAuction.address);

    const RadesICO = await ethers.getContractFactory("RadesICO");
    const radesICO = await RadesICO.deploy(10000, 100, "0xE3C3E2837f81814B20f1e6f80a21b88C00E3370a", "0x8cA466eF834b9050e2E86d2AD124490f596f643f");
    console.log('RadesICO address: ', radesICO.address);
    Config.setConfig(network + '.RadesICO', radesICO.address);

    const RadesMarketplace = await ethers.getContractFactory("RadesMarketplace");
    const radesMarketplace = await RadesMarketplace.deploy("0x8cA466eF834b9050e2E86d2AD124490f596f643f" ,radesNFT.address);
    console.log('RadesMarketplace address: ', radesMarketplace.address);
    Config.setConfig(network + '.RadesMarketplace', radesMarketplace.address);

    const RadesStaking = await ethers.getContractFactory("RadesStaking");
    const radesStaking = await RadesStaking.deploy("0x8cA466eF834b9050e2E86d2AD124490f596f643f");
    console.log('ImpetusCrowdSale address: ', radesStaking.address);
    Config.setConfig(network + '.RadesStaking', radesStaking.address);

    await Config.updateConfig();
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
});