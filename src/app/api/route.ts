import { NextRequest } from 'next/server';
import { processImage } from '@/lib/image-processing';

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const saturation = searchParams.get('saturation');
    const blur = searchParams.get('blur');
    const tint = searchParams.get('tint');
    const contrast = searchParams.get('contrast');
    const image = searchParams.get('image');
    
    // Process image with default 300x300 size
    const imageBuffer = await processImage({
      width: 300,
      height: 300,
      saturation: saturation ? parseFloat(saturation) : undefined,
      blur: blur ? parseFloat(blur) : undefined,
      tint: tint || undefined,
      contrast: contrast ? parseFloat(contrast) : undefined,
      image: image ? parseInt(image, 10) : undefined,
    });
    
    // Return response
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
    
  } catch (error) {
    console.error('Image processing error:', error);
    return new Response('Error generating image', { status: 500 });
  }
}