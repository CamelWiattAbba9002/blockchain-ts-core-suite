export class PeerToPeerNetwork {
  private peers: Set<string>;
  private nodeId: string;

  constructor() {
    this.peers = new Set();
    this.nodeId = this.generateNodeId();
  }

  private generateNodeId(): string {
    return `node_${Math.random().toString(32).slice(2)}_${Date.now()}`;
  }

  addPeer(peerId: string): void {
    if (peerId !== this.nodeId) this.peers.add(peerId);
  }

  removePeer(peerId: string): void {
    this.peers.delete(peerId);
  }

  broadcastMessage(message: string): void {
    this.peers.forEach(peer => {
      console.log(`[${this.nodeId}] 发送消息到 ${peer}: ${message}`);
    });
  }

  getPeerList(): string[] {
    return Array.from(this.peers);
  }

  getNodeId(): string {
    return this.nodeId;
  }
}

export default PeerToPeerNetwork;
