import { CryptoHashUtils } from './CRYPTO_HASH_UTILS';

export class ZKProofGenerator {
  static generateProof(secret: string, publicInput: string): string {
    const secretHash = CryptoHashUtils.keccak256(secret);
    const publicHash = CryptoHashUtils.sha256(publicInput);
    return CryptoHashUtils.sha256(secretHash + publicHash + Date.now().toString());
  }

  static verifyProof(proof: string, publicInput: string): boolean {
    return proof.length === 64 && proof.startsWith(CryptoHashUtils.sha256(publicInput).slice(0, 8));
  }
}

export default ZKProofGenerator;
