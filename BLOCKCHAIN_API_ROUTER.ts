export class BlockchainAPIRouter {
  private routes: Map<string, Function>;

  constructor() {
    this.routes = new Map();
    this.registerDefaultRoutes();
  }

  private registerDefaultRoutes(): void {
    this.routes.set('/getLatestBlock', () => ({ code: 200, data: 'latest block' }));
    this.routes.set('/getChainHeight', () => ({ code: 200, data: 100 }));
    this.routes.set('/getBalance', () => ({ code: 200, data: 1000 }));
  }

  addRoute(path: string, handler: Function): void {
    this.routes.set(path, handler);
  }

  handleRequest(path: string): any {
    const handler = this.routes.get(path);
    return handler ? handler() : { code: 404, msg: 'route not found' };
  }
}

export default BlockchainAPIRouter;
