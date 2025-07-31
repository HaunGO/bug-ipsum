# Bug Ipsum - Migration Guide for Next.js

## 🎯 **Current State Documentation**

### **Project Overview**
- **Name**: Bug Ipsum
- **Type**: Placeholder image service with advanced effects
- **Current Stack**: Express.js + Sharp + Vanilla HTML/CSS
- **Target Stack**: Next.js + React + TypeScript

### **Core Features Implemented**

#### **Image Processing Effects**
- ✅ **Grayscale** - `?grayscale=true`
- ✅ **Blur** - `?blur=3` (0-10 range)
- ✅ **Tint** - `?tint=ff6b6b` (hex color)
- ✅ **Contrast** - `?contrast=1.5` (0.1-3.0 range)
- ✅ **Combined Effects** - Multiple parameters supported

#### **API Endpoints**
```
GET /{width}/{height}?[effects]
GET / - Homepage with live examples
```

#### **Image Sources**
- `images/1.jpg` (117KB)
- `images/2.jpg` (421KB) 
- `images/3.jpg` (48KB)
- Random selection for each request

### **Current Architecture**

#### **Server Logic (Express)**
```javascript
// Core image processing pipeline
let pipeline = sharp(randomImagePath).resize(w, h, { fit: "cover" });

if (grayscale) pipeline = pipeline.grayscale();
if (blur) pipeline = pipeline.blur(parseFloat(blur));
if (contrast) pipeline = pipeline.linear(contrastValue, -(contrastValue * 0.5) + 0.5);
if (tint) {
  // Convert hex to RGB and apply tint
  pipeline = pipeline.tint({ r: r * 255, g: g * 255, b: b * 255 });
}
```

#### **UI Components (Current)**
- **Header** - Black background with title
- **Masonry Grid** - Responsive card layout
- **Image Cards** - Title, code, live image
- **Parameter Grid** - API documentation
- **Brutalist Design** - Utility-first aesthetic

### **Design System**

#### **Colors**
- Primary: `#000` (Black)
- Secondary: `#f5f5f5` (Light Gray)
- Borders: `#e0e0e0`
- Text: `#333`, `#666`

#### **Typography**
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', monospace`
- Sizes: `14px` base, `2rem` headers, `0.85rem` code

#### **Layout**
- **Masonry Grid**: `repeat(auto-fill, minmax(300px, 1fr))`
- **Gaps**: `2rem` between cards
- **Responsive**: Single column on mobile

### **Performance Considerations**
- **Caching**: 1 hour cache headers
- **Image Processing**: Sharp library optimization
- **Random Selection**: In-memory image array

## 🚀 **Next.js Migration Plan**

### **Phase 1: Project Setup**
```bash
npx create-next-app@latest bug-ipsum-next --typescript --tailwind --app
```

### **Phase 2: API Routes**
```typescript
// app/api/[width]/[height]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { width: string; height: string } }
) {
  // Migrate Express logic here
}
```

### **Phase 3: Component Library**
```typescript
// components/ui/
- Card.tsx
- Grid.tsx
- Header.tsx
- ImageCard.tsx
- ParameterCard.tsx
```

### **Phase 4: Design System**
```typescript
// lib/design-system.ts
export const colors = {
  primary: '#000',
  secondary: '#f5f5f5',
  // ...
}
```

## 📦 **Files to Export**

### **Core Logic**
- Image processing pipeline
- Parameter validation
- Error handling
- Caching strategy

### **UI Components**
- Masonry grid layout
- Card components
- Brutalist styling
- Responsive design

### **Configuration**
- Image sources
- Effect parameters
- API endpoints
- Design tokens

## 🎨 **Design Decisions to Preserve**

1. **Brutalist Aesthetic** - Utility-first, no decoration
2. **Masonry Layout** - Natural image sizes, organic flow
3. **Live Examples** - Real-time image generation
4. **Monospace Typography** - Technical, developer-focused
5. **Black Header** - Bold, authoritative presence

## 🔧 **Technical Requirements**

### **Dependencies to Migrate**
- `sharp` - Image processing
- Image handling logic
- Parameter validation
- Error responses

### **New Dependencies**
- `next` - Framework
- `react` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling (optional)

## 📝 **Migration Checklist**

- [ ] Set up Next.js project structure
- [ ] Migrate API routes to Next.js API handlers
- [ ] Extract UI components to React
- [ ] Implement design system
- [ ] Add TypeScript types
- [ ] Set up image optimization
- [ ] Implement caching strategy
- [ ] Add error boundaries
- [ ] Set up testing framework
- [ ] Deploy to production

## 🎯 **Success Metrics**

- ✅ All current features working
- ✅ Same visual design preserved
- ✅ Improved performance
- ✅ Better developer experience
- ✅ Type safety
- ✅ Component reusability 