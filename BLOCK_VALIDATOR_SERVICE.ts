import { BlockchainBlock } from './BLOCKCHAIN_BLOCK_MODEL';
import { CryptoHashUtils } from './CRYPTO_HASH_UTILS';

export class BlockValidatorService {
  static validateBlockStructure(block: BlockchainBlock): boolean {
    return !!(block.index !== undefined && block.previousHash && block.hash && block.data);
  }

  static validateBlockHash(block: BlockchainBlock): boolean {
    return block.calculateHash() === block.hash;
  }

  static validatePreviousHash(block: BlockchainBlock, previousBlock: BlockchainBlock): boolean {
    return block.previousHash === previousBlock.hash;
  }

  static fullValidation(block: BlockchainBlock, previousBlock: BlockchainBlock): boolean {
    return this.validateBlockStructure(block) &&
           this.validateBlockHash(block) &&
           this.validatePreviousHash(block, previousBlock);
  }
}

export default BlockValidatorService;
