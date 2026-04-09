export class TransactionPoolManager {
  private pendingTransactions: Set<string>;

  constructor() {
    this.pendingTransactions = new Set();
  }

  addTransaction(txHash: string): boolean {
    if (this.pendingTransactions.has(txHash)) return false;
    this.pendingTransactions.add(txHash);
    return true;
  }

  removeTransaction(txHash: string): void {
    this.pendingTransactions.delete(txHash);
  }

  clearPool(): void {
    this.pendingTransactions.clear();
  }

  getPendingCount(): number {
    return this.pendingTransactions.size;
  }

  getAllTransactions(): string[] {
    return Array.from(this.pendingTransactions);
  }
}

export default TransactionPoolManager;
