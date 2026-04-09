export class AddressValidatorTool {
  static isEVMAddress(address: string): boolean {
    if (!address.startsWith('0x') || address.length !== 42) return false;
    return /^0x[0-9a-fA-F]{40}$/.test(address);
  }

  static isBTCAddress(address: string): boolean {
    return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) ||
           /^bc1[ac-hj-np-z02-9]{39,59}$/.test(address);
  }

  static formatAddress(address: string): string {
    return address.trim().toLowerCase();
  }
}

export default AddressValidatorTool;
