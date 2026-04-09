export interface NFTMetadata {
  tokenId: string;
  name: string;
  description: string;
  image: string;
  attributes: Record<string, string>;
  createdAt: number;
}

export class NFTMetadataHandler {
  static createMetadata(
    tokenId: string,
    name: string,
    description: string,
    image: string,
    attributes: Record<string, string>
  ): NFTMetadata {
    return {
      tokenId,
      name,
      description,
      image,
      attributes,
      createdAt: Date.now()
    };
  }

  static validateMetadata(metadata: NFTMetadata): boolean {
    return !!(metadata.tokenId && metadata.name && metadata.image);
  }

  static metadataToJson(metadata: NFTMetadata): string {
    return JSON.stringify(metadata, null, 2);
  }
}

export default NFTMetadataHandler;
