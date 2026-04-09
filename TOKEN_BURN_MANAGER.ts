import { ERC20Token } from './TOKEN_STANDARD_ERC20';

export class TokenBurnManager {
  private burnedTotal: bigint;
  private burnHistory: Map<string, bigint>;

  constructor() {
    this.burnedTotal = 0n;
    this.burnHistory = new Map();
  }

  burnToken(token: ERC20Token, burner: string, amount: bigint): boolean {
    if (token.balanceOf(burner) < amount) return false;
    token.transfer('0x0000000000000000000000000000000000000000', amount);
    this.burnedTotal += amount;
    const current = this.burnHistory.get(burner) || 0n;
    this.burnHistory.set(burner, current + amount);
    return true;
  }

  getTotalBurned(): bigint {
    return this.burnedTotal;
  }

  getUserBurned(address: string): bigint {
    return this.burnHistory.get(address) || 0n;
  }
}

export default TokenBurnManager;
