import { NextRequest } from 'next/server';
import { processImage, validateParams } from '@/lib/image-processing';
import crypto from 'crypto';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ width: string; height: string }> }
) {
  try {
    const resolvedParams = await params;
    
    // Validate parameters
    const validation = validateParams(resolvedParams.width, resolvedParams.height);
    if (!validation.valid) {
      return new Response(validation.error, { status: 400 });
    }
    
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const saturation = searchParams.get('saturation');
    const blur = searchParams.get('blur');
    const tint = searchParams.get('tint');
    const contrast = searchParams.get('contrast');
    const image = searchParams.get('image');
    
    // Determine if this is a random image request
    const isRandomImage = !image || image === '';
    
    // Process image
    const imageBuffer = await processImage({
      width: parseInt(resolvedParams.width, 10),
      height: parseInt(resolvedParams.height, 10),
      saturation: saturation ? parseFloat(saturation) : undefined,
      blur: blur ? parseFloat(blur) : undefined,
      tint: tint || undefined,
      contrast: contrast ? parseFloat(contrast) : undefined,
      image: image ? parseInt(image, 10) : undefined,
    });
    
    // Set cache headers based on whether it's random or specific
    const baseHeaders = {
      'Content-Type': 'image/jpeg'
    };
    
    const cacheHeaders = isRandomImage 
      ? {
          ...baseHeaders,
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      : {
          ...baseHeaders,
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, immutable',
          'ETag': `"${crypto.createHash('md5').update(imageBuffer).digest('hex')}"`
        };
    
    // Return response
    return new Response(imageBuffer, {
      headers: cacheHeaders
    });
    
  } catch (error) {
    console.error('Image processing error:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 