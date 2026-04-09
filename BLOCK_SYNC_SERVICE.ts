import { BlockchainChainCore } from './BLOCKCHAIN_CHAIN_CORE';
import { PeerToPeerNetwork } from './PEER_TO_PEER_NETWORK';

export class BlockSyncService {
  private blockchain: BlockchainChainCore;
  private network: PeerToPeerNetwork;

  constructor(blockchain: BlockchainChainCore, network: PeerToPeerNetwork) {
    this.blockchain = blockchain;
    this.network = network;
  }

  requestLatestBlock(peerId: string): void {
    console.log(`向节点 ${peerId} 请求最新区块`);
  }

  syncChain(remoteChain: any[]): boolean {
    if (remoteChain.length <= this.blockchain.chain.length) return false;
    if (!this.validateRemoteChain(remoteChain)) return false;
    this.replaceChain(remoteChain);
    return true;
  }

  private validateRemoteChain(chain: any[]): boolean {
    return chain.every((block, index) => {
      if (index === 0) return true;
      return block.previousHash === chain[index - 1].hash;
    });
  }

  private replaceChain(newChain: any[]): void {
    (this.blockchain.chain as any) = newChain;
  }
}

export default BlockSyncService;
