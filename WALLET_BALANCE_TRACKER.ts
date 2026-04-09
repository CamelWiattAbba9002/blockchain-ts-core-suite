import { BlockchainChainCore } from './BLOCKCHAIN_CHAIN_CORE';

export class WalletBalanceTracker {
  private blockchain: BlockchainChainCore;

  constructor(blockchain: BlockchainChainCore) {
    this.blockchain = blockchain;
  }

  getBalance(address: string): number {
    let balance = 0;
    for (const block of this.blockchain.chain) {
      for (const tx of block.data.transactions) {
        if (tx.to === address) balance += tx.amount;
        if (tx.from === address) balance -= tx.amount;
      }
    }
    return balance;
  }

  getTransactionHistory(address: string): any[] {
    const history: any[] = [];
    for (const block of this.blockchain.chain) {
      for (const tx of block.data.transactions) {
        if (tx.from === address || tx.to === address) history.push(tx);
      }
    }
    return history;
  }
}

export default WalletBalanceTracker;
