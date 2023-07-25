import { logger } from '@constants';
import { Market, Synchronize } from '@schemas';
import cron from 'node-cron';
import { marketContract, web3 } from '.';

/**
 * A global variable that can be accessed from anywhere in the code.
 * Note: Using global variables is generally not recommended as it can lead to
 * unexpected behavior and make the code harder to maintain.
 * @type {any}
 */
const globalVariable: any = global;

globalVariable.isSyncingGetDataFromSmartContract = false
/**
 * Asynchronously retrieves data from a smart contract and synchronizes it with the database.
 */
const onJobGetDataFromSmartContract = async () => {
  try {
    /**
     * If the global variable 'isSyncingGetDataFromSmartContract' is true, return.
     * Otherwise, set 'isSyncingGetDataFromSmartContract' to true.
     */
    if (globalVariable.isSyncingGetDataFromSmartContract) return;
    globalVariable.isSyncingGetDataFromSmartContract = true;
    /**
     * Finds the last synchronized block in the database.
     */
    const lastSynchronize = await Synchronize.findOne().sort({ last_block_number: -1 }).limit(1);
    const last_block_number = (lastSynchronize?.last_block_number || 0) + 1;
    /**
     * If lastSynchronize is falsy, create a new synchronization record with a last_block_number of 0,
     * set globalVariable.isSyncingGetDataFromSmartContract to false, and return.
     */
    if (!lastSynchronize?.last_block_number) {
      await Synchronize.create({
        last_block_number: 35774940,
      });
      globalVariable.isSyncingGetDataFromSmartContract = false;
      return;
    }

    let listTxHash: string[] = [];
    /**
     * Calculates the last block number on the blockchain by taking the minimum value between
     * the last block number plus 20000 and the current block number obtained from the web3 API.
     */
    const last_block_number_onchain = Math.min(
      last_block_number + 10000,
      await web3.eth.getBlockNumber()
    );
    /**
     * Synchronizes by sending a list of transaction hashes to the blockchain.
     */
    await synchronizeMarket(
      last_block_number, 
      last_block_number_onchain, 
      listTxHash,
    );
    /**
     * If the list of transaction hashes is not empty, create a new synchronization record with the last block number on chain.
     * Log the number of transactions synchronized.
     * If the list of transaction hashes is empty and the difference between the last block number on chain and the last block number
     * is greater than 500, create a new synchronization record with the last block number on chain.
     */
    if (listTxHash.length > 0) {
      /**
       * If the code is running in a test environment and the length of the list of transaction hashes is greater than 2,
       * remove all elements from the list starting from the third element.
       */
      if (listTxHash.length > 2) {
        listTxHash.splice(2, listTxHash.length - 2)
      }
      await Synchronize.create({
        last_block_number: last_block_number_onchain
      })
      /**
       * Removes duplicate elements from an array and returns a new array with unique elements.
       */
      listTxHash = [...new Set(listTxHash)]
      logger.info(
        `[onJobGetDataFromSmartContract] Synchronized ${listTxHash.length} transactions`
      )
    } else {
      if (last_block_number_onchain - last_block_number > 5000) {
        await Synchronize.create({
          last_block_number: last_block_number_onchain,
          transactions: [],
        });
      }
    }
  } catch (error: any) {
    logger.error({
      message: `[onJobGetDataFromSmartContract]${error.message}${error.stack}`,
      error: error.message,
      stack: error.stack
    })  
  }
  /**
   * A global boolean variable that indicates whether the application is currently syncing data from a smart contract.
   */
  globalVariable.isSyncingGetDataFromSmartContract = false;
};

/**
 * Synchronizes the NFTs from the blockchain to the database.
 * @param {number} last_block_number_sync - The last block number that was synchronized.
 * @param {number} last_block_number_onchain - The last block number on the blockchain.
 * @param {string[]} listTxHash - An array of transaction hashes to add to.
 */
const synchronizeMarket = async (
  last_block_number_sync: number,
  last_block_number_onchain: number,
  listTxHash: string[],
) => {
  /**
   * Returns a configuration object for retrieving past events from a blockchain.
   *  last_block_number_sync - The block number to start retrieving events from.
   *  last_block_number_onchain - The block number to stop retrieving events at.
   */
  const getPastEventsConfig = {
    fromBlock: last_block_number_sync,
    toBlock: last_block_number_onchain,
  };

  // /**
  //  * Retrieves the past transfer events and update events for the NFT contract using the provided configuration.
  //  */
  // const eventTransferNFT = await Promise.all([
  //   nftContract.getPastEvents(
  //     Constant.CONTRACT_EVENT.TRANSFER,
  //     getPastEventsConfig
  //   ),
  //   nftContract.getPastEvents(
  //     Constant.CONTRACT_EVENT.UPDATE,
  //     getPastEventsConfig
  //   )
  // ])
  // if (eventTransferNFT.length > 0) {
  //   /**
  //    * If the code is running in a test environment and the length of the eventTransferNFT array is greater than 2,
  //    * remove all elements from index 2 to the end of the array.
  //    * @param {boolean} is_test - a boolean indicating whether the code is running in a test environment
  //    * @param {Array} eventTransferNFT - an array of events
  //    * @returns None
  //    */
  //   if (is_test && eventTransferNFT.length > 2) {
  //     eventTransferNFT.splice(2, eventTransferNFT.length - 2)
  //   }
  //   logger.info(
  //     `[onJobGetDataFromSmartContract] Start synchronize:${eventTransferNFT.length} NFT transfer events`
  //   )
  //   /**
  //    * Sorts and maps an array of transfer NFT events to a new array of objects with additional properties.
  //    */
  //   const listTransferNFT = eventTransferNFT
  //     .sort(sortByBlockNumberAndTransactionIndex)
  //     .map((e) => ({
  //       tokenId: e.returnValues.tokenId,
  //       from: e.returnValues.from,
  //       to: e.returnValues.to,
  //       ...e
  //     }))
  //   /**
  //    * Pushes the transaction hash of each transfer NFT object in the given array to the end of the
  //    * given transaction hash array.
  //    */
  //   listTxHash.push(...listTransferNFT.map((e) => e.transactionHash))
  //   /**
  //    * Loops through a list of transferNFT objects and updates the corresponding SQL tables
  //    * with the relevant information.
  //    */
  //   for (const transferNFT of listTransferNFT) {
  //     /**
  //      * Retrieves the transaction result for a given transfer of an NFT.
  //      */
  //     const txResult = await web3.eth.getTransaction(
  //       transferNFT.transactionHash
  //     )
  //     /**
  //      * Retrieves the timestamp of the block in which the given transaction was included.
  //      */
  //     const txTimestamp = await web3.eth.getBlock(
  //       txResult.blockNumber ? txResult.blockNumber : 'latest'
  //     )
  //     /**
  //      * Finds or creates a user with the given address from and to.
  //      */
  //     const [userFrom] = await user.findOrCreate({
  //       where: {
  //         address: transferNFT.from.toLowerCase()
  //       }
  //     })
  //     const [userTo] = await user.findOrCreate({
  //       where: {
  //         address: transferNFT.to.toLowerCase()
  //       }
  //     })
  //     /**
  //      * Finds or creates a transaction in the database with the given transaction hash and
  //      * adds the transaction details to the database.
  //      */

  //     let transactionSql = await transaction.findOne({
  //       where: {
  //         transaction_hash: transferNFT.transactionHash
  //       }
  //     })
  //     const transactionData: Omit<ITransaction, 'id'> = {
  //       transaction_hash: transferNFT.transactionHash,
  //       block_hash: transferNFT.blockHash,
  //       block_number: transferNFT.blockNumber,
  //       user_id_from: userFrom.id,
  //       user_id_to: userTo.id,
  //       synchronize_id,
  //       value: txResult.value,
  //       create_at: new Date(parseInt(`${txTimestamp.timestamp}`) * 1000)
  //     }
  //     if (!transactionSql) {
  //       transactionSql = await transaction.create(transactionData)
  //     } else {
  //       await transactionSql.update({
  //         ...(({ create_at, ...object }) => object)(transactionData),
  //         update_at: new Date()
  //       })
  //     }
  //     /**
  //      * Finds a single NFT in the database based on the provided token ID.
  //      */
  //     let nftSql = await nft.findOne({
  //       where: {
  //         token_id: parseInt(transferNFT.tokenId)
  //       }
  //     })

  //     const uri = await nftContract.methods.tokenURI(transferNFT.tokenId).call()
  //     try {
  //       const metadata = await axios.get(uri)
  //       /**
  //        * If nftSql is not defined, create a new NFT in the database with the given transferNFT data.
  //        * Otherwise, update the owner of the existing NFT in the database with the new owner from transferNFT.
  //        */
  //       if (!nftSql) {
  //         nftSql = await nft.create({
  //           token_id: parseInt(transferNFT.tokenId),
  //           metadata: metadata.data,
  //           user_id: userTo.id,
  //           create_at: new Date(parseInt(`${txTimestamp.timestamp}`) * 1000),
  //           status: NFTStatus.COMPLETED
  //         })
  //       } else {
  //         nftSql.user_id = userTo.id
  //         nftSql.status = NFTStatus.COMPLETED
  //         nftSql.update_at = new Date()
  //         await nftSql.save()
  //       }
  //       /**
  //        * Finds or creates a new NFT transaction in the database.
  //        */
  //       const [, is_nft_transaction_created] =
  //         await nft_transaction.findOrCreate({
  //           where: {
  //             nft_id: nftSql.id,
  //             transaction_id: transactionSql.id
  //           },
  //           defaults: {
  //             nft_id: nftSql.id,
  //             transaction_id: transactionSql.id,
  //             event:
  //               /**
  //                * Determines the type of contract event based on the `from` address of a transferNFT object.
  //                * If the `from` address is the zero address, the event is a mint. Otherwise, it is a transfer.
  //                */
  //               transferNFT.from.toLowerCase() === Constant.ZERO_ADDRESS
  //                 ? Constant.CONTRACT_EVENT.MINT
  //                 : Constant.CONTRACT_EVENT.TRANSFER,
  //             metadata: metadata.data,
  //             user_id: userTo.id
  //           }
  //         })

  //       if (!is_nft_transaction_created) {
  //         await nft_transaction.update(
  //           {
  //             metadata: metadata.data,
  //             user_id: userTo.id
  //           },
  //           {
  //             where: {
  //               nft_id: nftSql.id,
  //               transaction_id: transactionSql.id
  //             }
  //           }
  //         )
  //       }
  //     } catch (errorUri: any) {
  //       logger.error(`[listTransferNFT][metadata]${errorUri.message}`)
  //     }
  //   }
  //   logger.info(
  //     `[onJobGetDataFromSmartContract] End synchronize:${listTransferNFT.length} NFT transfer events`
  //   )
  // }

  const eventListNFT = await marketContract.getPastEvents('ListNFT', getPastEventsConfig);

  const eventUnlistNFT = await marketContract.getPastEvents('UnlistNFT', getPastEventsConfig);

  const eventBuyNFT = await marketContract.getPastEvents('BuyNFT', getPastEventsConfig);

  const event = [
    ...eventListNFT,
    ...eventUnlistNFT,
    ...eventBuyNFT,
  ];

  listTxHash.push(...eventListNFT.map(e => e.transactionHash));
  listTxHash.push(...eventListNFT.map(e => e.transactionHash));
  listTxHash.push(...eventBuyNFT.map(e => e.transactionHash));


  for (const listUpdate of event) {
    if (listUpdate.event == 'UnlistNFT') {
      try {
        await Market.findOneAndUpdate(
          { token_id: listUpdate.returnValues.tokenId },
          {
            owner: listUpdate.returnValues[2],
            is_list: true,
            priceFix: listUpdate.returnValues.price,
            updated_at: new Date(),
          },
          { upsert: true },
        );
      } catch (error: any) {
        logger.error(`Can not update listNFT: ${listUpdate.returnValues.tokenId}, error: ${error.message}`);
      }
    }

    else if (listUpdate.event == 'UnlistNFT') {
      try {
        await Market.findOneAndUpdate(
          { token_id: listUpdate.returnValues.tokenId },
          {
            owner: listUpdate.returnValues.newOwner,
            is_list: false,
            priceFix: 0,
            updated_at: new Date(),
          },
          { upsert: true },
        );
      } catch (error: any) {
        logger.error(`Can not update UnlistNFT: ${listUpdate.returnValues.tokenId}, error: ${error.message}`);
      }
    }
    else if (listUpdate.event == 'BuyNFT') {
      try {
        await Market.findOneAndUpdate(
          { token_id: listUpdate.returnValues._tokenId },
          {
            owner: listUpdate.returnValues.buyer,
            is_list: false,
            priceFix: 0,
            updated_at: new Date(),
          },
          { upsert: true },
        );
      } catch (error: any) {
        logger.error(`Can not update BuyNFT: ${listUpdate.returnValues.tokenId}, error: ${error.message}`);
      }
    }
  }
};
const startSynchronizeDataFromSmartContract = () => {
  /**
   * Schedules a cron job to run every 5 seconds to get data from a smart contract.
   */
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  cron.schedule('*/5 * * * * *', () => onJobGetDataFromSmartContract())
};

export { startSynchronizeDataFromSmartContract };