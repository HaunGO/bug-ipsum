# Bug Ipsum - UI Components for React Migration

## 🎨 **Current UI Structure**

### **Page Layout**
```html
<div class="container">
  <div class="header">...</div>
  <div class="content">
    <div class="section">...</div>
    <div class="section">...</div>
    <div class="section">...</div>
  </div>
  <div class="footer">...</div>
</div>
```

## 🧩 **React Component Breakdown**

### **1. Header Component**
```tsx
// components/Header.tsx
interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="bg-black text-white py-8 mb-0">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-base opacity-80">{subtitle}</p>
      </div>
    </div>
  );
}
```

### **2. Section Component**
```tsx
// components/Section.tsx
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className = '' }: SectionProps) {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <h2 className="bg-gray-100 px-8 py-4 text-xl font-semibold border-b border-gray-200">
        {title}
      </h2>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}
```

### **3. Masonry Grid Component**
```tsx
// components/MasonryGrid.tsx
interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
}

export function MasonryGrid({ children, className = '' }: MasonryGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${className}`}>
      {children}
    </div>
  );
}
```

### **4. Image Card Component**
```tsx
// components/ImageCard.tsx
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

### **5. Parameter Card Component**
```tsx
// components/ParameterCard.tsx
interface ParameterCardProps {
  title: string;
  description: string;
  code: string;
}

export function ParameterCard({ title, description, code }: ParameterCardProps) {
  return (
    <div className="p-4 border border-gray-200 bg-gray-50">
      <h3 className="text-sm font-semibold mb-1 text-gray-800">{title}</h3>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <div className="bg-gray-100 border border-gray-200 p-2 rounded font-mono text-xs text-gray-700">
        {code}
      </div>
    </div>
  );
}
```

### **6. Code Block Component**
```tsx
// components/CodeBlock.tsx
interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className = '' }: CodeBlockProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 p-3 font-mono text-sm text-gray-700 overflow-x-auto ${className}`}>
      {children}
    </div>
  );
}
```

### **7. URL Example Component**
```tsx
// components/UrlExample.tsx
interface UrlExampleProps {
  children: string;
}

export function UrlExample({ children }: UrlExampleProps) {
  return (
    <div className="bg-black text-white p-4 font-mono text-sm my-4">
      {children}
    </div>
  );
}
```

## 🎨 **CSS/Tailwind Classes**

### **Container**
```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
}
```
```tsx
// Tailwind equivalent
<div className="max-w-7xl mx-auto px-0">
```

### **Header**
```css
.header {
  background: #000;
  color: #fff;
  padding: 2rem 0;
  margin-bottom: 0;
}
```
```tsx
// Tailwind equivalent
<div className="bg-black text-white py-8 mb-0">
```

### **Section**
```css
.section {
  margin-bottom: 0;
  border-bottom: 1px solid #e0e0e0;
}
```
```tsx
// Tailwind equivalent
<div className="mb-0 border-b border-gray-200">
```

### **Masonry Grid**
```css
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 0;
}
```
```tsx
// Tailwind equivalent
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 m-0">
```

### **Card**
```css
.card {
  border: 1px solid #e0e0e0;
  background: #fff;
  padding: 1.5rem;
}
```
```tsx
// Tailwind equivalent
<div className="border border-gray-200 bg-white p-6">
```

## 📱 **Responsive Design**

### **Mobile First Approach**
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
```

### **Breakpoints**
- **Mobile**: `grid-cols-1` (single column)
- **Tablet**: `md:grid-cols-2` (2 columns)
- **Desktop**: `lg:grid-cols-3` (3 columns)
- **Large**: `xl:grid-cols-4` (4 columns)

## 🎯 **Component Usage Examples**

### **Homepage Layout**
```tsx
// app/page.tsx
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { MasonryGrid } from '@/components/MasonryGrid';
import { ImageCard } from '@/components/ImageCard';

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
            {/* More cards... */}
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
            {/* More effect cards... */}
          </MasonryGrid>
        </Section>
        
        <Section title="PARAMETERS">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ParameterCard 
              title="Size"
              description="Width and height in pixels"
              code="/width/height"
            />
            {/* More parameter cards... */}
          </div>
        </Section>
      </div>
      
      <footer className="bg-gray-100 px-8 py-4 text-center text-sm text-gray-600 border-t border-gray-200">
        <p>Sharp • Express • Node.js v24.4.1</p>
      </footer>
    </div>
  );
}
```

## 🔧 **Styling Options**

### **Option 1: Tailwind CSS (Recommended)**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### **Option 2: CSS Modules**
```tsx
// components/ImageCard.module.css
.card {
  border: 1px solid #e0e0e0;
  background: #fff;
  padding: 1.5rem;
}
```

### **Option 3: Styled Components**
```tsx
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #e0e0e0;
  background: #fff;
  padding: 1.5rem;
`;
```

## 🎨 **Design System Integration**

### **Theme Provider**
```tsx
// lib/theme.ts
export const theme = {
  colors: {
    primary: '#000',
    secondary: '#f5f5f5',
    border: '#e0e0e0',
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", monospace',
      code: '"Monaco", "Menlo", "Ubuntu Mono", monospace',
    },
  },
};
```

### **CSS Variables**
```css
:root {
  --color-primary: #000;
  --color-secondary: #f5f5f5;
  --color-border: #e0e0e0;
  --color-text-primary: #333;
  --color-text-secondary: #666;
}
```

## 📦 **Component Library Structure**

```
components/
├── ui/
│   ├── Header.tsx
│   ├── Section.tsx
│   ├── MasonryGrid.tsx
│   ├── ImageCard.tsx
│   ├── ParameterCard.tsx
│   ├── CodeBlock.tsx
│   └── UrlExample.tsx
├── layout/
│   ├── Container.tsx
│   └── Footer.tsx
└── index.ts
```

## 🎯 **Migration Checklist**

- [ ] Set up Tailwind CSS or preferred styling solution
- [ ] Create component files with TypeScript interfaces
- [ ] Implement responsive design
- [ ] Add proper accessibility attributes
- [ ] Set up component testing
- [ ] Create storybook documentation (optional)
- [ ] Implement dark mode support (optional) 