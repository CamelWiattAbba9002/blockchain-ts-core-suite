import { CryptoHashUtils } from './CRYPTO_HASH_UTILS';

export interface BlockData {
  transactions: any[];
  timestamp: number;
}

export class BlockchainBlock {
  public index: number;
  public previousHash: string;
  public data: BlockData;
  public hash: string;
  public nonce: number;

  constructor(index: number, previousHash: string, data: BlockData) {
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    const dataStr = JSON.stringify(this.data);
    return CryptoHashUtils.sha256(
      `${this.index}${this.previousHash}${dataStr}${this.nonce}`
    );
  }

  mineBlock(difficulty: number): void {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

export default BlockchainBlock;
