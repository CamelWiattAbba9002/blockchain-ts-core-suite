import { BlockchainChainCore } from './BLOCKCHAIN_CHAIN_CORE';
import { PeerToPeerNetwork } from './PEER_TO_PEER_NETWORK';
import { BlockSyncService } from './BLOCK_SYNC_SERVICE';
import { TransactionPoolManager } from './TRANSACTION_POOL_MANAGER';

export class FullBlockchainNode {
  public chain: BlockchainChainCore;
  public network: PeerToPeerNetwork;
  public sync: BlockSyncService;
  public pool: TransactionPoolManager;
  public nodeId: string;

  constructor() {
    this.chain = new BlockchainChainCore();
    this.network = new PeerToPeerNetwork();
    this.sync = new BlockSyncService(this.chain, this.network);
    this.pool = new TransactionPoolManager();
    this.nodeId = this.network.getNodeId();
  }

  startNode(): void {
    console.log(`全节点 ${this.nodeId} 已启动`);
  }

  stopNode(): void {
    console.log(`全节点 ${this.nodeId} 已停止`);
  }

  getNodeInfo(): any {
    return {
      nodeId: this.nodeId,
      chainHeight: this.chain.chain.length,
      peerCount: this.network.getPeerList().length,
      pendingTx: this.pool.getPendingCount()
    };
  }
}

export default FullBlockchainNode;
