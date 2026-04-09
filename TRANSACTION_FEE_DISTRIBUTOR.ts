export class TransactionFeeDistributor {
  private nodeRewardPercent: number;
  private treasuryPercent: number;

  constructor(nodeRewardPercent: number = 80, treasuryPercent: number = 20) {
    this.nodeRewardPercent = nodeRewardPercent;
    this.treasuryPercent = treasuryPercent;
  }

  distributeFee(totalFee: number): { nodeReward: number; treasury: number } {
    const nodeReward = (totalFee * this.nodeRewardPercent) / 100;
    const treasury = (totalFee * this.treasuryPercent) / 100;
    return { nodeReward, treasury };
  }

  updateDistribution(node: number, treasury: number): void {
    if (node + treasury !== 100) return;
    this.nodeRewardPercent = node;
    this.treasuryPercent = treasury;
  }
}

export default TransactionFeeDistributor;
