/**
 * AES-GCM Image Encryption/Decryption using Web Crypto API
 * 
 * This module provides cryptographically secure encryption for image data
 * using AES-256-GCM with PBKDF2 key derivation.
 */

const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const PBKDF2_ITERATIONS = 100000;

/**
 * Derives a cryptographic key from a password using PBKDF2
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  // Import password as raw key material
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
  
  // Derive AES-GCM key using PBKDF2
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer as ArrayBuffer,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts image data using AES-256-GCM
 * 
 * Output format: [salt (16 bytes)][iv (12 bytes)][encrypted data]
 */
export async function encryptImageData(imageData: Uint8ClampedArray, password: string): Promise<Uint8Array> {
  // Generate random salt and IV
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  
  // Derive key from password
  const key = await deriveKey(password, salt);
  
  // Convert Uint8ClampedArray to ArrayBuffer for encryption
  const dataBuffer = new Uint8Array(imageData).buffer as ArrayBuffer;
  
  // Encrypt the image data
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    dataBuffer
  );
  
  // Combine salt + iv + encrypted data
  const result = new Uint8Array(SALT_LENGTH + IV_LENGTH + encryptedData.byteLength);
  result.set(salt, 0);
  result.set(iv, SALT_LENGTH);
  result.set(new Uint8Array(encryptedData), SALT_LENGTH + IV_LENGTH);
  
  return result;
}

/**
 * Decrypts image data that was encrypted with encryptImageData
 * 
 * Input format: [salt (16 bytes)][iv (12 bytes)][encrypted data]
 */
export async function decryptImageData(encryptedBuffer: Uint8Array, password: string): Promise<Uint8ClampedArray> {
  // Extract salt, iv, and encrypted data
  const salt = encryptedBuffer.slice(0, SALT_LENGTH);
  const iv = encryptedBuffer.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const encryptedData = encryptedBuffer.slice(SALT_LENGTH + IV_LENGTH);
  
  // Derive key from password
  const key = await deriveKey(password, salt);
  
  // Decrypt the data
  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encryptedData
  );
  
  return new Uint8ClampedArray(decryptedData);
}

/**
 * Converts encrypted data to a visual representation on canvas
 * The encrypted bytes are stored in the RGB channels with a header
 */
export async function encryptCanvasImage(
  canvas: HTMLCanvasElement,
  password: string
): Promise<{ width: number; height: number; encryptedData: Uint8Array }> {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const encryptedData = await encryptImageData(imageData.data, password);
  
  return {
    width: canvas.width,
    height: canvas.height,
    encryptedData
  };
}

/**
 * Creates a visual "encrypted" canvas by displaying noise pattern
 * and embedding encrypted data in the image
 */
export async function createEncryptedCanvas(
  canvas: HTMLCanvasElement,
  password: string
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  const originalWidth = canvas.width;
  const originalHeight = canvas.height;
  const imageData = ctx.getImageData(0, 0, originalWidth, originalHeight);
  
  // Encrypt the image data
  const encryptedBytes = await encryptImageData(imageData.data, password);
  
  // Create header with metadata (dimensions + encrypted data length)
  const header = new Uint8Array(12);
  const headerView = new DataView(header.buffer);
  headerView.setUint32(0, originalWidth, true);
  headerView.setUint32(4, originalHeight, true);
  headerView.setUint32(8, encryptedBytes.length, true);
  
  // Combine header and encrypted data
  const fullData = new Uint8Array(header.length + encryptedBytes.length);
  fullData.set(header, 0);
  fullData.set(encryptedBytes, header.length);
  
  // Calculate required canvas size to store all data
  // Each pixel stores 3 bytes (RGB), alpha is always 255
  const pixelsNeeded = Math.ceil(fullData.length / 3);
  const newWidth = Math.ceil(Math.sqrt(pixelsNeeded));
  const newHeight = Math.ceil(pixelsNeeded / newWidth);
  
  // Resize canvas
  canvas.width = newWidth;
  canvas.height = newHeight;
  
  // Create new image data with encrypted content
  const newImageData = ctx.createImageData(newWidth, newHeight);
  const pixels = newImageData.data;
  
  // Fill with encrypted data
  for (let i = 0; i < pixelsNeeded; i++) {
    const dataIdx = i * 3;
    const pixelIdx = i * 4;
    
    pixels[pixelIdx] = fullData[dataIdx] ?? 0;         // R
    pixels[pixelIdx + 1] = fullData[dataIdx + 1] ?? 0; // G
    pixels[pixelIdx + 2] = fullData[dataIdx + 2] ?? 0; // B
    pixels[pixelIdx + 3] = 255;                        // A (fully opaque)
  }
  
  // Fill remaining pixels with pattern to indicate encrypted image
  for (let i = pixelsNeeded; i < newWidth * newHeight; i++) {
    const pixelIdx = i * 4;
    pixels[pixelIdx] = 42;     // R
    pixels[pixelIdx + 1] = 42; // G
    pixels[pixelIdx + 2] = 42; // B
    pixels[pixelIdx + 3] = 255; // A
  }
  
  ctx.putImageData(newImageData, 0, 0);
}

/**
 * Decrypts an encrypted canvas back to original image
 */
export async function decryptCanvasImage(
  canvas: HTMLCanvasElement,
  password: string
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  
  // Extract data from RGB channels
  const extractedBytes: number[] = [];
  for (let i = 0; i < pixels.length; i += 4) {
    extractedBytes.push(pixels[i]);     // R
    extractedBytes.push(pixels[i + 1]); // G
    extractedBytes.push(pixels[i + 2]); // B
  }
  
  const fullData = new Uint8Array(extractedBytes);
  
  // Read header
  const headerView = new DataView(fullData.buffer, 0, 12);
  const originalWidth = headerView.getUint32(0, true);
  const originalHeight = headerView.getUint32(4, true);
  const encryptedLength = headerView.getUint32(8, true);
  
  // Validate dimensions
  if (originalWidth <= 0 || originalWidth > 10000 || originalHeight <= 0 || originalHeight > 10000) {
    throw new Error('Invalid image dimensions in encrypted data');
  }
  
  if (encryptedLength <= 0 || encryptedLength > fullData.length - 12) {
    throw new Error('Invalid encrypted data length');
  }
  
  // Extract encrypted data
  const encryptedData = fullData.slice(12, 12 + encryptedLength);
  
  // Decrypt
  const decryptedData = await decryptImageData(encryptedData, password);
  
  // Validate decrypted data size matches expected dimensions
  const expectedSize = originalWidth * originalHeight * 4;
  if (decryptedData.length !== expectedSize) {
    throw new Error('Decrypted data size mismatch - wrong password or corrupted data');
  }
  
  // Restore canvas with decrypted image
  canvas.width = originalWidth;
  canvas.height = originalHeight;
  
  // Create a new Uint8ClampedArray with a fresh ArrayBuffer to satisfy ImageData requirements
  const imageDataArray = new Uint8ClampedArray(decryptedData.length);
  imageDataArray.set(decryptedData);
  
  const restoredImageData = new ImageData(imageDataArray, originalWidth, originalHeight);
  ctx.putImageData(restoredImageData, 0, 0);
}
