import { BlockchainBlock } from './BLOCKCHAIN_BLOCK_MODEL';
import { POWConsensusEngine } from './POW_CONSENSUS_ENGINE';

export class BlockchainChainCore {
  public chain: BlockchainBlock[];
  private consensus: POWConsensusEngine;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.consensus = new POWConsensusEngine();
  }

  private createGenesisBlock(): BlockchainBlock {
    return new BlockchainBlock(0, '0', {
      transactions: [],
      timestamp: Date.now()
    });
  }

  getLatestBlock(): BlockchainBlock {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: any): void {
    const newBlock = new BlockchainBlock(
      this.chain.length,
      this.getLatestBlock().hash,
      data
    );
    newBlock.mineBlock(this.consensus.getDifficulty());
    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
      if (!this.consensus.validateBlock(current)) return false;
    }
    return true;
  }
}

export default BlockchainChainCore;
