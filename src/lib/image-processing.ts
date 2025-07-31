import sharp from 'sharp';
import path from 'path';
import crypto from 'crypto';

export interface ImageParams {
  width: number;
  height: number;
  saturation?: number; // Saturation level: 0 = grayscale, 1 = normal, 2+ = oversaturated
  blur?: number;
  tint?: string;
  contrast?: number;
  image?: number; // Index of the image to use (0, 1, 2)
}

export async function processImage(params: ImageParams): Promise<Buffer> {
  const { width, height, saturation, blur, tint, contrast, image } = params;
  
  // Pick image based on parameter or random
  const imageFiles = ['1.jpg', '2.jpg', '3.jpg'];
  let selectedImage: string;
  
  if (image !== undefined && image >= 0 && image < imageFiles.length) {
    selectedImage = imageFiles[image];
  } else {
    // Use crypto.randomInt for better randomization
    const randomIndex = crypto.randomInt(0, imageFiles.length);
    selectedImage = imageFiles[randomIndex];
  }
  
  const imagePath = path.join(process.cwd(), 'public', 'images', selectedImage);
  
  // Start pipeline
  let pipeline = sharp(imagePath).resize(width, height, { fit: "cover" });
  
  // Apply effects
  if (saturation !== undefined && saturation !== null) {
    const saturationValue = parseFloat(saturation.toString());
    if (!isNaN(saturationValue) && saturationValue >= 0 && saturationValue <= 3) {
      pipeline = pipeline.modulate({ saturation: saturationValue });
    }
  }
  
  if (blur !== undefined && blur !== null) {
    const blurValue = parseFloat(blur.toString());
    if (!isNaN(blurValue) && blurValue > 0 && blurValue <= 20) {
      pipeline = pipeline.blur(blurValue);
    }
  }
  
  if (contrast) {
    const contrastValue = parseFloat(contrast.toString());
    if (!isNaN(contrastValue) && contrastValue >= 0.1 && contrastValue <= 3.0) {
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