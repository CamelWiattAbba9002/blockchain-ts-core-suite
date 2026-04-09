import { sign, verify } from 'crypto';
import { CryptoHashUtils } from './CRYPTO_HASH_UTILS';

export class TransactionSigner {
  static signTransaction(data: string, privateKey: string): string {
    const hash = CryptoHashUtils.sha256(data);
    return sign('sha256', Buffer.from(hash), privateKey).toString('hex');
  }

  static verifySignature(data: string, signature: string, publicKey: string): boolean {
    const hash = CryptoHashUtils.sha256(data);
    return verify('sha256', Buffer.from(hash), publicKey, Buffer.from(signature, 'hex'));
  }
}

export default TransactionSigner;
