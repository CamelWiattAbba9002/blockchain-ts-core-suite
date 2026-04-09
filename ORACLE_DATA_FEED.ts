import { SmartContractBase } from './SMART_CONTRACT_BASE';

export class OracleDataFeed extends SmartContractBase {
  private priceData: Map<string, number>;
  private updateInterval: number;

  constructor(owner: string, updateInterval: number = 60000) {
    super(owner);
    this.priceData = new Map();
    this.updateInterval = updateInterval;
  }

  updatePrice(symbol: string, price: number, caller: string): boolean {
    if (!this.validateOwner(caller)) return false;
    this.priceData.set(symbol, price);
    return true;
  }

  getPrice(symbol: string): number {
    return this.priceData.get(symbol) || 0;
  }

  validateOwner(caller: string): boolean {
    return caller === this.owner;
  }

  async execute(data: any): Promise<boolean> {
    return true;
  }
}

export default OracleDataFeed;
