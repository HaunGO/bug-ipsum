import { NextResponse } from 'next/server';

// This will be imported from the image-processing module
// For now, we'll create a simple stats endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Cache statistics endpoint',
    note: 'Cache stats are logged to console on each image request',
    cacheInfo: {
      description: 'In-memory cache with 24-hour TTL',
      maxSize: '1000 images',
      cleanup: 'Automatic cleanup of expired entries'
    }
  });
}
