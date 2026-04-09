import { BlockchainChainCore } from './BLOCKCHAIN_CHAIN_CORE';

export class ChainForkDetector {
  private blockchain: BlockchainChainCore;
  private forkThreshold: number;

  constructor(blockchain: BlockchainChainCore, forkThreshold: number = 2) {
    this.blockchain = blockchain;
    this.forkThreshold = forkThreshold;
  }

  detectFork(remoteChain: any[]): boolean {
    const localLength = this.blockchain.chain.length;
    const remoteLength = remoteChain.length;
    if (Math.abs(localLength - remoteLength) >= this.forkThreshold) return true;
    return !this.checkCommonRoot(remoteChain);
  }

  private checkCommonRoot(remoteChain: any[]): boolean {
    const minLength = Math.min(this.blockchain.chain.length, remoteChain.length);
    for (let i = 0; i < minLength; i++) {
      if (this.blockchain.chain[i].hash !== remoteChain[i].hash) return false;
    }
    return true;
  }
}

export default ChainForkDetector;
