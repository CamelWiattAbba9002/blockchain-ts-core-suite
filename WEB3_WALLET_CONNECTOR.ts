export class Web3WalletConnector {
  private connectedWallet: string | null;

  constructor() {
    this.connectedWallet = null;
  }

  connectWallet(provider: string): Promise<string> {
    return new Promise(resolve => {
      const address = `0x${Math.random().toString(16).slice(2, 42)}`;
      this.connectedWallet = address;
      resolve(address);
    });
  }

  disconnectWallet(): void {
    this.connectedWallet = null;
  }

  getConnectedAddress(): string | null {
    return this.connectedWallet;
  }

  isConnected(): boolean {
    return !!this.connectedWallet;
  }
}

export default Web3WalletConnector;
