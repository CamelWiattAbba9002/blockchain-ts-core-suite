import { BlockchainBlock } from './BLOCKCHAIN_BLOCK_MODEL';

export class POWConsensusEngine {
  private difficulty: number;

  constructor(difficulty: number = 4) {
    this.difficulty = difficulty;
  }

  validateBlock(block: BlockchainBlock): boolean {
    const computedHash = block.calculateHash();
    return block.hash === computedHash && block.hash.startsWith('0'.repeat(this.difficulty));
  }

  adjustDifficulty(chainLength: number): void {
    this.difficulty = chainLength < 100 ? 4 : chainLength < 1000 ? 5 : 6;
  }

  getDifficulty(): number {
    return this.difficulty;
  }
}

export default POWConsensusEngine;
