import sharp from 'sharp';
import path from 'path';
import crypto from 'crypto';

// In-memory cache for processed images
const imageCache = new Map<string, { buffer: Buffer; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const MAX_CACHE_SIZE = 1000; // Maximum number of cached images

export interface ImageParams {
  width: number;
  height: number;
  saturation?: number; // Saturation level: 1-9 scale (1 = minimum, 5 = normal, 9 = maximum)
  blur?: number; // Blur level: 1-9 scale (1 = minimal blur, 9 = maximum blur)
  tint?: string;
  contrast?: number; // Contrast level: 1-9 scale (1 = minimal contrast, 5 = normal, 9 = maximum)
  image?: number; // Index of the image to use (0-25 for the new bug images)
  timestamp?: number; // Add timestamp for base /api route uniqueness
}

// Generate a unique cache key for the image parameters
function generateCacheKey(params: ImageParams): string {
  const { width, height, saturation, blur, tint, contrast, image, timestamp } = params;
  const keyParts = [
    width,
    height,
    saturation || 'default',
    blur || 'default',
    tint || 'default',
    contrast || 'default',
    image !== undefined ? image : 'random',
    timestamp || 'no-timestamp'
  ];
  return crypto.createHash('md5').update(keyParts.join('|')).digest('hex');
}

// Clean up expired cache entries
function cleanupCache(): void {
  const now = Date.now();
  const expiredKeys: string[] = [];
  
  for (const [key, value] of imageCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      expiredKeys.push(key);
    }
  }
  
  expiredKeys.forEach(key => imageCache.delete(key));
  
  // If cache is still too large, remove oldest entries
  if (imageCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(imageCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
    toRemove.forEach(([key]) => imageCache.delete(key));
  }
}

// Helper functions to map 1-9 scale to actual effect values
function mapSaturation(scale: number): number {
  // Scale 1-9 maps to saturation 0.1-4.5
  // Scale 5 = normal (1.0), Scale 1 = desaturated (0.1), Scale 9 = highly saturated (4.5)
  return 0.1 + ((scale - 1) / 8) * 4.4;
}

function mapBlur(scale: number): number {
  // Scale 1-9 maps to blur 0.3-3.5 (increased max blur for more effect)
  // Scale 1 = minimal blur (0.3), Scale 9 = maximum blur (3.5)
  return 0.3 + ((scale - 1) / 8) * 3.2;
}

function mapContrast(scale: number): number {
  // Scale 1-9 maps to contrast 0.1-3.0
  // Scale 5 = normal (1.0), Scale 1 = low contrast (0.1), Scale 9 = high contrast (3.0)
  return 0.1 + ((scale - 1) / 8) * 2.9;
}

// Actual image processing logic
async function processImageBuffer(params: ImageParams): Promise<Buffer> {
  const { width, height, saturation, blur, tint, contrast, image } = params;
  
  // Updated image list with the new bug images
  const imageFiles = [
    'leaf-footed-bug-on-a-window-2.jpg',
    'black-widow-underbelly.jpg',
    'leaf-footed-bug-on-a-window-1.jpg',
    'big-brown-moth-2.jpg',
    'cotton-candy-moth.jpg',
    'easter-bugs-3.jpg',
    'ladybug-softy.jpg',
    'easter-bugs-1.jpg',
    'easter-bugs-2.jpg',
    'ladybug-macro.jpg',
    'beetle-on-a-leaf_27937308242_o.jpg',
    'macro-fly.jpg',
    'little-green-leaf-bug.jpg',
    'bug-juice.jpg',
    'jumping-spider.jpg',
    'rolley-polley.jpg',
    'big-harry-tarantula.jpg',
    'inch-worm-macro-2.jpg',
    'inch-worm-macro-1.jpg',
    'spider-in-white.jpg',
    'unknown-red-bug.jpg',
    'under-ladybug-skirt.jpg',
    'beetles-under-tree-bark-macro-1.jpg',
    'beetles-under-tree-bark-macro-2.jpg',
    'bug-silhouette-on-screen.jpg',
    'bumble-bee.jpg',
    'potato-beetle.jpg',
    'big-fly.jpg'
  ];
  
  let selectedImage: string;
  
  if (image !== undefined && image >= 0 && image < imageFiles.length) {
    selectedImage = imageFiles[image];
  } else {
    // Use crypto.randomInt for better randomization
    const randomIndex = crypto.randomInt(0, imageFiles.length);
    selectedImage = imageFiles[randomIndex];
  }
  
  const imagePath = path.join(process.cwd(), 'public', 'images', 'bugs', 'only', selectedImage);
  
  // Start pipeline
  let pipeline = sharp(imagePath).resize(width, height, { fit: "cover" });
  
  // Apply effects using 1-9 scale
  if (saturation !== undefined && saturation !== null) {
    const saturationScale = parseInt(saturation.toString());
    if (!isNaN(saturationScale) && saturationScale >= 1 && saturationScale <= 9) {
      const saturationValue = mapSaturation(saturationScale);
      pipeline = pipeline.modulate({ saturation: saturationValue });
    }
  }
  
  if (blur !== undefined && blur !== null) {
    const blurScale = parseInt(blur.toString());
    if (!isNaN(blurScale) && blurScale >= 1 && blurScale <= 9) {
      const blurValue = mapBlur(blurScale);
      pipeline = pipeline.blur(blurValue);
    }
  }
  
  if (contrast !== undefined && contrast !== null) {
    const contrastScale = parseInt(contrast.toString());
    if (!isNaN(contrastScale) && contrastScale >= 1 && contrastScale <= 9) {
      const contrastValue = mapContrast(contrastScale);
      pipeline = pipeline.linear(contrastValue, -(contrastValue * 0.5) + 0.5);
    }
  }
  
  if (tint) {
    const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(tint)) {
      const normalizedTint = tint.startsWith('#') ? tint : `#${tint}`;
      const hex = normalizedTint.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      pipeline = pipeline.tint({ r: r * 255, g: g * 255, b: b * 255 });
    }
  }
  
  return await pipeline.toBuffer();
}

export async function processImage(params: ImageParams): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { width, height, saturation, blur, tint, contrast, image, timestamp } = params;
  
  // For random images (no specific image parameter) OR when timestamp is provided, bypass cache entirely
  const isRandomImage = image === undefined || timestamp !== undefined;
  
  if (!isRandomImage) {
    // Clean up cache periodically (only for non-random images)
    cleanupCache();
    
    // Generate cache key
    const cacheKey = generateCacheKey(params);
    
    // Check if image is already cached
    const cached = imageCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      console.log(`Cache HIT for key: ${cacheKey}`);
      return cached.buffer;
    }
    
    console.log(`Cache MISS for key: ${cacheKey}`);
    
    // Process the image
    const buffer = await processImageBuffer(params);
    
    // Cache the processed image
    imageCache.set(cacheKey, { buffer, timestamp: Date.now() });
    
    return buffer;
  } else {
    // For random images or timestamp-based requests, always process without caching
    console.log(`Random image or timestamp request - bypassing cache`);
    return await processImageBuffer(params);
  }
}

export function validateParams(width: string, height: string): { valid: boolean; error?: string } {
  const w = parseInt(width, 10);
  const h = parseInt(height, 10);
  
  if (isNaN(w) || isNaN(h)) {
    return { valid: false, error: "Invalid size" };
  }
  
  if (w <= 0 || h <= 0) {
    return { valid: false, error: "Dimensions must be positive" };
  }
  
  if (w > 5000 || h > 5000) {
    return { valid: false, error: "Dimensions too large" };
  }
  
  return { valid: true };
} 