import { createHash } from 'crypto';

export class CryptoHashUtils {
  static sha256(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  static keccak256(data: string): string {
    return createHash('sha3-256').update(data).digest('hex');
  }

  static md5(data: string): string {
    return createHash('md5').update(data).digest('hex');
  }

  static doubleSha256(data: string): string {
    const firstHash = this.sha256(data);
    return this.sha256(firstHash);
  }
}

export default CryptoHashUtils;
