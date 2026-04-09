import { BlockchainChainCore } from './BLOCKCHAIN_CHAIN_CORE';

export class ChainStatisticsAnalyzer {
  private blockchain: BlockchainChainCore;

  constructor(blockchain: BlockchainChainCore) {
    this.blockchain = blockchain;
  }

  getTotalTransactions(): number {
    let count = 0;
    for (const block of this.blockchain.chain) {
      count += block.data.transactions.length;
    }
    return count;
  }

  getAverageBlockTime(): number {
    if (this.blockchain.chain.length <= 1) return 0;
    let totalTime = 0;
    for (let i = 1; i < this.blockchain.chain.length; i++) {
      totalTime += this.blockchain.chain[i].data.timestamp - this.blockchain.chain[i - 1].data.timestamp;
    }
    return totalTime / (this.blockchain.chain.length - 1);
  }

  getChainHeight(): number {
    return this.blockchain.chain.length;
  }
}

export default ChainStatisticsAnalyzer;
