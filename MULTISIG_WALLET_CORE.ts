import { SmartContractBase } from './SMART_CONTRACT_BASE';

export class MultiSigWalletCore extends SmartContractBase {
  private owners: string[];
  private requiredSignatures: number;
  private transactions: Map<string, { signers: string[]; executed: boolean }>;

  constructor(owner: string, owners: string[], requiredSignatures: number) {
    super(owner);
    this.owners = owners;
    this.requiredSignatures = requiredSignatures;
    this.transactions = new Map();
  }

  createTransaction(txId: string): void {
    this.transactions.set(txId, { signers: [], executed: false });
  }

  signTransaction(txId: string, signer: string): boolean {
    const tx = this.transactions.get(txId);
    if (!tx || tx.executed || !this.owners.includes(signer) || tx.signers.includes(signer)) return false;
    tx.signers.push(signer);
    return true;
  }

  executeTransaction(txId: string): boolean {
    const tx = this.transactions.get(txId);
    if (!tx || tx.executed || tx.signers.length < this.requiredSignatures) return false;
    tx.executed = true;
    return true;
  }

  validateOwner(caller: string): boolean {
    return this.owners.includes(caller);
  }

  async execute(data: any): Promise<boolean> {
    return true;
  }
}

export default MultiSigWalletCore;
