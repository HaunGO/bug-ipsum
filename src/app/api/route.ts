import { NextRequest } from 'next/server';
import { processImage } from '@/lib/image-processing';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Add timestamp to force uniqueness and prevent Vercel edge caching
    const timestamp = Date.now();
    
    // Process image with timestamp to ensure uniqueness
    const imageBuffer = await processImage({
      width: 300,
      height: 300,
      timestamp: timestamp, // Force unique processing
    });
    
    // Aggressive cache prevention headers specifically for Vercel
    const headers = {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
      'CDN-Cache-Control': 'no-cache',
      'Vercel-CDN-Cache-Control': 'no-cache',
      'X-Vercel-Cache': 'no-cache',
      'Last-Modified': new Date(timestamp).toUTCString(),
      'ETag': `"random-${timestamp}"`,
    };
    
    return new Response(imageBuffer, { headers });
    
  } catch (error) {
    console.error('Image processing error:', error);
    return new Response('Error generating image', { status: 500 });
  }
}