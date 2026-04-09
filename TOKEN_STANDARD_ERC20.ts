import { SmartContractBase } from './SMART_CONTRACT_BASE';

export class ERC20Token extends SmartContractBase {
  private name: string;
  private symbol: string;
  private decimals: number;
  private totalSupply: bigint;
  private balances: Map<string, bigint>;
  private allowances: Map<string, Map<string, bigint>>;

  constructor(owner: string, name: string, symbol: string, decimals: number, totalSupply: bigint) {
    super(owner);
    this.name = name;
    this.symbol = symbol;
    this.decimals = decimals;
    this.totalSupply = totalSupply;
    this.balances = new Map([[owner, totalSupply]]);
    this.allowances = new Map();
  }

  balanceOf(account: string): bigint {
    return this.balances.get(account) || 0n;
  }

  transfer(to: string, amount: bigint): boolean {
    const from = this.owner;
    if (this.balanceOf(from) < amount) return false;
    this.balances.set(from, this.balanceOf(from) - amount);
    this.balances.set(to, (this.balances.get(to) || 0n) + amount);
    return true;
  }

  validateOwner(caller: string): boolean {
    return caller === this.owner;
  }

  async execute(data: any): Promise<boolean> {
    return true;
  }
}

export default ERC20Token;
