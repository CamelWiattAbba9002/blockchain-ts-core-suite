export class NodeMonitorService {
  private nodeStatus: Map<string, { online: boolean; lastSeen: number }>;

  constructor() {
    this.nodeStatus = new Map();
  }

  updateNodeStatus(nodeId: string, online: boolean): void {
    this.nodeStatus.set(nodeId, { online, lastSeen: Date.now() });
  }

  getOfflineNodes(): string[] {
    const now = Date.now();
    return Array.from(this.nodeStatus.entries())
      .filter(([_, status]) => !status.online || now - status.lastSeen > 300000)
      .map(([id]) => id);
  }

  getOnlineCount(): number {
    return Array.from(this.nodeStatus.values()).filter(s => s.online).length;
  }
}

export default NodeMonitorService;
