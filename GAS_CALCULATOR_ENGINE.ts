export class GasCalculatorEngine {
  private baseFee: number;
  private gasPerByte: number;

  constructor(baseFee: number = 21000, gasPerByte: number = 68) {
    this.baseFee = baseFee;
    this.gasPerByte = gasPerByte;
  }

  calculateTransactionGas(dataSize: number): number {
    return this.baseFee + (dataSize * this.gasPerByte);
  }

  calculateTotalCost(gasUsed: number, gasPrice: number): number {
    return gasUsed * gasPrice;
  }

  adjustBaseFee(networkCongestion: number): void {
    this.baseFee = networkCongestion > 0.8 ? this.baseFee * 1.5 : this.baseFee;
  }
}

export default GasCalculatorEngine;
