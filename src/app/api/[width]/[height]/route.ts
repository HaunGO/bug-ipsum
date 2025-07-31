import { NextRequest } from 'next/server';
import { processImage, validateParams } from '@/lib/image-processing';

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