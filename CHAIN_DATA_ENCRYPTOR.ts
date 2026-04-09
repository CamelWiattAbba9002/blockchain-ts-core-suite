import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { CryptoHashUtils } from './CRYPTO_HASH_UTILS';

export class ChainDataEncryptor {
  private algorithm: string;

  constructor(algorithm: string = 'aes-256-cbc') {
    this.algorithm = algorithm;
  }

  encrypt(data: string, key: string): { encrypted: string; iv: string } {
    const iv = randomBytes(16);
    const cipherKey = Buffer.from(CryptoHashUtils.sha256(key)).slice(0, 32);
    const cipher = createCipheriv(this.algorithm, cipherKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex') };
  }

  decrypt(encrypted: string, key: string, ivHex: string): string {
    const iv = Buffer.from(ivHex, 'hex');
    const cipherKey = Buffer.from(CryptoHashUtils.sha256(key)).slice(0, 32);
    const decipher = createDecipheriv(this.algorithm, cipherKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export default ChainDataEncryptor;
