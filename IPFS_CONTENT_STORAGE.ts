export class IPFSContentStorage {
  private storedContent: Map<string, string>;

  constructor() {
    this.storedContent = new Map();
  }

  uploadContent(content: string): string {
    const cid = `Qm${Math.random().toString(36).slice(2, 15)}${Date.now().toString(36)}`;
    this.storedContent.set(cid, content);
    return cid;
  }

  getContent(cid: string): string | null {
    return this.storedContent.get(cid) || null;
  }

  deleteContent(cid: string): boolean {
    if (!this.storedContent.has(cid)) return false;
    this.storedContent.delete(cid);
    return true;
  }
}

export default IPFSContentStorage;
