export class ContractEventLogger {
  private eventLogs: Map<string, any[]>;

  constructor() {
    this.eventLogs = new Map();
  }

  emitEvent(contractAddress: string, eventName: string, data: any): void {
    const log = {
      timestamp: Date.now(),
      eventName,
      data
    };
    const events = this.eventLogs.get(contractAddress) || [];
    events.push(log);
    this.eventLogs.set(contractAddress, events);
  }

  getEvents(contractAddress: string): any[] {
    return this.eventLogs.get(contractAddress) || [];
  }

  clearEvents(contractAddress: string): void {
    this.eventLogs.set(contractAddress, []);
  }
}

export default ContractEventLogger;
