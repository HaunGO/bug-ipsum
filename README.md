# 🐛 BugIpsum.com

A buggy little placeholder image service featuring my own custom photography of bugs. Perfect for developers, designers, and anyone who needs unique placeholder images with a mandibles!  

All images are my own original photos, mostly also available on my Flickr account: https://www.flickr.com/photos/haungo/ 

![Bug Ipsum Demo](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38A169)

## ✨ Features

### 🖼️ **Smart Image Generation**
- **Dynamic Sizing**: Generate images at any width/height (up to 5000px)
- **Image Selection**: Choose specific bug images or get random selections
- **Real-time Processing**: On-the-fly image resizing and optimization

### 🎨 **Visual Effects**
- **Saturation Control**: Adjust color intensity (1-9 scale)
- **Contrast Adjustment**: Fine-tune image contrast (1-9 scale)
- **Blur Effects**: Add artistic blur (1-9 scale)
- **Color Tinting**: Apply custom hex color tints

### ⚡ **Performance Optimized**
- **Intelligent Caching**: Multi-level caching system
- **Conditional Caching**: Random images bypass cache, specific images cached aggressively
- **CDN Ready**: Optimized for edge caching and global delivery
- **Memory Management**: Automatic cache cleanup and size limits

### 🎭 **Site Features**
- **Dark Mode Support**: Beautiful light/dark theme switching

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.4.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GSAP** - Advanced animations and scrolling
- **React Hooks** - Modern state management

### **Backend & Processing**
- **Sharp** - High-performance image processing
- **Node.js** - Server-side runtime
- **Next.js API Routes** - Serverless API endpoints

### **Infrastructure**
- **Vercel** - Deployment and hosting
- **Google Analytics** - Performance monitoring
- **Environment Variables** - Secure configuration management

### **Development Tools**
- **Turbopack** - Fast development bundling
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization

## 🚀 Quick Start

### **Basic Usage**

Quickly generate a random bug image:
```
https://bugipsum.com/api/
```

Get a specific bug image:
```
https://bugipsum.com/api/500/500?image=5
```

### **Advanced Parameters**

Add visual effects to your images:
```
https://bugipsum.com/api/800/600?image=3&saturation=7&blur=2&tint=ff6b6b&contrast=6
```

**Parameters:**
- `width` / `height` - Image dimensions (URL path)
- `image` - Specific image index (0-26)
- `saturation` - Color intensity (1-9)
- `blur` - Blur effect (1-9)
- `tint` - Hex color tint (e.g., `ff6b6b`)
- `contrast` - Contrast adjustment (1-9)

## 📸 Image Collection

The service features over 20 photos of bug, slugs, spiders, etc.. all take by me!  
- 🦋 Butterflies and moths
- 🕷️ Spiders and arachnids
- 🐞 Ladybugs and beetles
- 🦗 Crickets and grasshoppers
- 🐛 Various insects and bugs

Each image is carefully selected for visual appeal and interest. 

## 🎯 Use Cases

### **For Developers**
- **UI Mockups**: Quick placeholder images for wireframes
- **Testing**: Consistent image sizes for responsive design
- **Prototyping**: Fast iteration without image assets

### **For Designers**
- **Mood Boards**: Nature-inspired visual elements
- **Presentations**: Unique background images
- **Social Media**: Engaging content creation

## 🔧 Development

### **Local Setup**

```bash
# Clone the repository
git clone https://github.com/HaunGO/bug-ipsum.git
cd bug-ipsum

# Install dependencies
npm install
# Start development server
npm run dev
```

### **Environment Variables**


### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🏗️ Architecture

### **API Structure**
```
/api/[width]/[height]?[parameters]
```

### **Caching Strategy**
- **Random Images**: No caching for variety
- **Specific Images**: 24-hour aggressive caching
- **Memory Management**: 1000 image limit with auto-cleanup

### **Performance Features**
- **Lazy Loading**: Images load as needed
- **Optimized Processing**: Efficient Sharp pipelines
- **CDN Integration**: Global edge caching
- **Compression**: Automatic JPEG optimization

## 🎨 Customization

### **Adding New Images**
1. Place images in `public/images/bugs/only/`
2. Update the image list in `src/lib/image-processing.ts`
3. Images are automatically available via API

### **Styling**
- **Tailwind CSS**: Utility classes for rapid styling
- **Custom CSS**: Global styles in `src/app/globals.css`
- **Component Library**: Reusable UI components


## 📊 Performance Metrics

- **Image Processing**: < 100ms average
- **Cache Hit Rate**: > 95% for repeated requests
- **Memory Usage**: < 100MB for 1000 cached images
- **CDN Response**: < 50ms globally

---

**Made with ❤️ and 🐛 by me, Brandon. **

*It's not a bug, it's a feature.*
