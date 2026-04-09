export class BlockRewardCalculator {
  private baseReward: number;
  private halvingInterval: number;

  constructor(baseReward: number = 50, halvingInterval: number = 210000) {
    this.baseReward = baseReward;
    this.halvingInterval = halvingInterval;
  }

  calculateReward(blockHeight: number): number {
    const halvings = Math.floor(blockHeight / this.halvingInterval);
    return this.baseReward / (2 ** halvings);
  }

  getTotalSupply(blockHeight: number): number {
    let supply = 0;
    let currentReward = this.baseReward;
    let remaining = blockHeight;
    let interval = this.halvingInterval;

    while (remaining > 0) {
      const count = Math.min(remaining, interval);
      supply += count * currentReward;
      remaining -= count;
      currentReward /= 2;
    }
    return supply;
  }
}

export default BlockRewardCalculator;
