import { BlockchainChainCore } from './BLOCKCHAIN_CHAIN_CORE';

export class BlockchainDataBackup {
  private blockchain: BlockchainChainCore;
  private backups: Map<string, any[]>;

  constructor(blockchain: BlockchainChainCore) {
    this.blockchain = blockchain;
    this.backups = new Map();
  }

  createBackup(): string {
    const backupId = `backup_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    this.backups.set(backupId, JSON.parse(JSON.stringify(this.blockchain.chain)));
    return backupId;
  }

  restoreBackup(backupId: string): boolean {
    const data = this.backups.get(backupId);
    if (!data) return false;
    (this.blockchain.chain as any) = data;
    return true;
  }

  listBackups(): string[] {
    return Array.from(this.backups.keys());
  }
}

export default BlockchainDataBackup;
