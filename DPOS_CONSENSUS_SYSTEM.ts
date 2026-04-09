export class DPoSConsensusSystem {
  private validators: Map<string, number>;
  private maxValidators: number;

  constructor(maxValidators: number = 21) {
    this.validators = new Map();
    this.maxValidators = maxValidators;
  }

  voteValidator(validator: string, votes: number): void {
    const current = this.validators.get(validator) || 0;
    this.validators.set(validator, current + votes);
  }

  getTopValidators(): string[] {
    return Array.from(this.validators.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, this.maxValidators)
      .map(item => item[0]);
  }

  validateBlockByValidator(blockHash: string, validator: string): boolean {
    const topValidators = this.getTopValidators();
    return topValidators.includes(validator);
  }
}

export default DPoSConsensusSystem;
