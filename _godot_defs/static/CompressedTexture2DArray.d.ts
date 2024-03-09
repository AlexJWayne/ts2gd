
/**
 * A texture array that is loaded from a `.ctexarray` file. This file format is internal to Godot; it is created by importing other image formats with the import system. [CompressedTexture2DArray] can use one of 4 compresson methods:
 *
 * - Lossless (WebP or PNG, uncompressed on the GPU)
 *
 * - Lossy (WebP, uncompressed on the GPU)
 *
 * - VRAM Compressed (compressed on the GPU)
 *
 * - VRAM Uncompressed (uncompressed on the GPU)
 *
 * - Basis Universal (compressed on the GPU. Lower file sizes than VRAM Compressed, but slower to compress and lower quality than VRAM Compressed)
 *
 * Only **VRAM Compressed** actually reduces the memory usage on the GPU. The **Lossless** and **Lossy** compression methods will reduce the required storage on disk, but they will not reduce memory usage on the GPU as the texture is sent to the GPU uncompressed.
 *
 * Using **VRAM Compressed** also improves loading times, as VRAM-compressed textures are faster to load compared to textures using lossless or lossy compression. VRAM compression can exhibit noticeable artifacts and is intended to be used for 3D rendering, not 2D.
 *
 * See [Texture2DArray] for a general description of texture arrays.
 *
*/
declare class CompressedTexture2DArray extends CompressedTextureLayered  {

  
/**
 * A texture array that is loaded from a `.ctexarray` file. This file format is internal to Godot; it is created by importing other image formats with the import system. [CompressedTexture2DArray] can use one of 4 compresson methods:
 *
 * - Lossless (WebP or PNG, uncompressed on the GPU)
 *
 * - Lossy (WebP, uncompressed on the GPU)
 *
 * - VRAM Compressed (compressed on the GPU)
 *
 * - VRAM Uncompressed (uncompressed on the GPU)
 *
 * - Basis Universal (compressed on the GPU. Lower file sizes than VRAM Compressed, but slower to compress and lower quality than VRAM Compressed)
 *
 * Only **VRAM Compressed** actually reduces the memory usage on the GPU. The **Lossless** and **Lossy** compression methods will reduce the required storage on disk, but they will not reduce memory usage on the GPU as the texture is sent to the GPU uncompressed.
 *
 * Using **VRAM Compressed** also improves loading times, as VRAM-compressed textures are faster to load compared to textures using lossless or lossy compression. VRAM compression can exhibit noticeable artifacts and is intended to be used for 3D rendering, not 2D.
 *
 * See [Texture2DArray] for a general description of texture arrays.
 *
*/
  new(): CompressedTexture2DArray; 
  static "new"(): CompressedTexture2DArray 





  connect<T extends SignalsOf<CompressedTexture2DArray>>(signal: T, method: SignalFunction<CompressedTexture2DArray[T]>): number;






}

