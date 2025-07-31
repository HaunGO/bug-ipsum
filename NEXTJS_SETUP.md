# Bug Ipsum - Next.js Quick Start

## 🚀 **Create Next.js Project**

```bash
# Create new Next.js project
npx create-next-app@latest bug-ipsum-next --typescript --tailwind --app --src-dir --import-alias "@/*"

# Navigate to project
cd bug-ipsum-next

# Install Sharp for image processing
npm install sharp
```

## 📁 **Project Structure**

```
bug-ipsum-next/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── [width]/
│   │   │       └── [height]/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Header.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── MasonryGrid.tsx
│   │   │   ├── ImageCard.tsx
│   │   │   ├── ParameterCard.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   └── UrlExample.tsx
│   │   └── index.ts
│   ├── lib/
│   │   ├── image-processing.ts
│   │   ├── validation.ts
│   │   └── design-system.ts
│   └── types/
│       └── index.ts
├── public/
│   └── images/
│       ├── 1.jpg
│       ├── 2.jpg
│       └── 3.jpg
├── package.json
└── README.md
```

## 🔧 **Copy Core Files**

### **1. Copy Images**
```bash
# Copy images from original project
cp -r ../placeholder-service/images/* public/images/
```

### **2. Create API Route**
```typescript
// src/app/api/[width]/[height]/route.ts
import { NextRequest } from 'next/server';
import { processImage, validateParams } from '@/lib/image-processing';

export async function GET(
  request: NextRequest,
  { params }: { params: { width: string; height: string } }
) {
  try {
    // Validate parameters
    const validation = validateParams(params.width, params.height);
    if (!validation.valid) {
      return new Response(validation.error, { status: 400 });
    }
    
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const grayscale = searchParams.get('grayscale') === 'true';
    const blur = searchParams.get('blur');
    const tint = searchParams.get('tint');
    const contrast = searchParams.get('contrast');
    
    // Process image
    const imageBuffer = await processImage({
      width: parseInt(params.width, 10),
      height: parseInt(params.height, 10),
      grayscale,
      blur: blur ? parseFloat(blur) : undefined,
      tint: tint || undefined,
      contrast: contrast ? parseFloat(contrast) : undefined,
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
```

### **3. Create Image Processing Library**
```typescript
// src/lib/image-processing.ts
import sharp from 'sharp';
import path from 'path';

export interface ImageParams {
  width: number;
  height: number;
  grayscale?: boolean;
  blur?: number;
  tint?: string;
  contrast?: number;
}

export async function processImage(params: ImageParams): Promise<Buffer> {
  const { width, height, grayscale, blur, tint, contrast } = params;
  
  // Pick random image
  const imageFiles = ['1.jpg', '2.jpg', '3.jpg'];
  const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  const imagePath = path.join(process.cwd(), 'public', 'images', randomImage);
  
  // Start pipeline
  let pipeline = sharp(imagePath).resize(width, height, { fit: "cover" });
  
  // Apply effects
  if (grayscale) {
    pipeline = pipeline.grayscale();
  }
  
  if (blur) {
    const blurValue = parseFloat(blur.toString());
    if (!isNaN(blurValue) && blurValue >= 0 && blurValue <= 10) {
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
```

### **4. Create Components**
```typescript
// src/components/ui/ImageCard.tsx
interface ImageCardProps {
  title: string;
  code: string;
  imageUrl: string;
  alt: string;
}

export function ImageCard({ title, code, imageUrl, alt }: ImageCardProps) {
  return (
    <div className="border border-gray-200 bg-white p-6">
      <h3 className="text-base font-semibold mb-3 text-gray-800">{title}</h3>
      <div className="bg-gray-50 border border-gray-200 p-3 rounded font-mono text-sm text-gray-700 mb-3 overflow-x-auto">
        {code}
      </div>
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-auto border border-gray-200 my-3"
      />
    </div>
  );
}
```

### **5. Create Homepage**
```typescript
// src/app/page.tsx
import { Header } from '@/components/ui/Header';
import { Section } from '@/components/ui/Section';
import { MasonryGrid } from '@/components/ui/MasonryGrid';
import { ImageCard } from '@/components/ui/ImageCard';
import { UrlExample } from '@/components/ui/UrlExample';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header 
        title="BUG IPSUM" 
        subtitle="Generate placeholder images with custom sizes and effects" 
      />
      
      <div className="content">
        <Section title="BASIC USAGE">
          <UrlExample>GET /{'{width}'}/{'{height}'}</UrlExample>
          <MasonryGrid>
            <ImageCard 
              title="Basic"
              code="/300/200"
              imageUrl="/api/300/200"
              alt="300x200"
            />
            <ImageCard 
              title="Square"
              code="/400/400"
              imageUrl="/api/400/400"
              alt="400x400"
            />
            <ImageCard 
              title="Wide"
              code="/800/200"
              imageUrl="/api/800/200"
              alt="800x200"
            />
          </MasonryGrid>
        </Section>
        
        <Section title="EFFECTS">
          <MasonryGrid>
            <ImageCard 
              title="Grayscale"
              code="/300/200?grayscale=true"
              imageUrl="/api/300/200?grayscale=true"
              alt="Grayscale"
            />
            <ImageCard 
              title="Blur"
              code="/300/200?blur=3"
              imageUrl="/api/300/200?blur=3"
              alt="Blur"
            />
            <ImageCard 
              title="Red Tint"
              code="/300/200?tint=ff6b6b"
              imageUrl="/api/300/200?tint=ff6b6b"
              alt="Red Tint"
            />
          </MasonryGrid>
        </Section>
      </div>
      
      <footer className="bg-gray-100 px-8 py-4 text-center text-sm text-gray-600 border-t border-gray-200">
        <p>Sharp • Next.js • TypeScript</p>
      </footer>
    </div>
  );
}
```

## 🚀 **Run the Project**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

## 🎯 **Test the API**

```bash
# Test basic image
curl http://localhost:3000/api/300/200

# Test with effects
curl http://localhost:3000/api/300/200?grayscale=true&blur=3

# Test tint
curl http://localhost:3000/api/300/200?tint=ff6b6b
```

## 📦 **Additional Setup**

### **Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### **Sharp Configuration**
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
}

module.exports = nextConfig
```

## 🎨 **Customization**

### **Design System**
```typescript
// src/lib/design-system.ts
export const colors = {
  primary: '#000',
  secondary: '#f5f5f5',
  border: '#e0e0e0',
  text: {
    primary: '#333',
    secondary: '#666',
  },
} as const;

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", monospace',
    code: '"Monaco", "Menlo", "Ubuntu Mono", monospace',
  },
} as const;
```

### **Tailwind Configuration**
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

## 🎯 **Next Steps**

1. **Add more effects** - Brightness, saturation, rotation
2. **Implement caching** - Redis or in-memory cache
3. **Add authentication** - API keys for production
4. **Set up monitoring** - Error tracking and analytics
5. **Deploy to production** - Vercel, Netlify, or custom server 