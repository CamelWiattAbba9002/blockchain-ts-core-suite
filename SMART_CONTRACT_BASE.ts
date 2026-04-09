export abstract class SmartContractBase {
  public contractAddress: string;
  public owner: string;
  public deployedAt: number;

  constructor(owner: string) {
    this.contractAddress = this.generateAddress();
    this.owner = owner;
    this.deployedAt = Date.now();
  }

  private generateAddress(): string {
    const random = Math.random().toString(16).slice(2);
    return `0x${random.padStart(40, '0')}`;
  }

  abstract execute(data: any): Promise<boolean>;
  abstract validateOwner(caller: string): boolean;

  transferOwnership(newOwner: string, caller: string): boolean {
    if (!this.validateOwner(caller)) return false;
    this.owner = newOwner;
    return true;
  }
}

export default SmartContractBase;
