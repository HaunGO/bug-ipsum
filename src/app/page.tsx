import { Section } from '@/components/ui/Section';
import { MasonryGrid } from '@/components/ui/MasonryGrid';
import { ImageCard } from '@/components/ui/ImageCard';
import { UrlExample } from '@/components/ui/UrlExample';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { Header } from '@/components/ui/Header';
// import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Footer } from '@/components/ui/Footer';

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Header 
          title="Bug Ipsum"
          subtitle="A buggy placeholder image generator"
          className="mb-12"
        />
        
        <div className="px-8 py-6">
          <ImageGallery title="SOURCE IMAGES" />
        </div>

        <Section title="BASIC USAGE" className="sectionScroller">
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

        <Section title="IMAGE SELECTION" className="sectionScroller">
          <UrlExample>GET /{'{width}'}/{'{height}'}?image={'{index}'}</UrlExample>
          <MasonryGrid>
            <ImageCard 
              title="Image 0"
              code="/300/200?image=0"
              imageUrl="/api/300/200?image=0"
              alt="Image 0"
            />
            <ImageCard 
              title="Image 1"
              code="/300/200?image=1"
              imageUrl="/api/300/200?image=1"
              alt="Image 1"
            />
            <ImageCard 
              title="Image 2"
              code="/300/200?image=2"
              imageUrl="/api/300/200?image=2"
              alt="Image 2"
            />
          </MasonryGrid>
        </Section>
        
        <Section title="SATURATION SCALE" className="sectionScroller">
          <UrlExample>GET /{'{width}'}/{'{height}'}?saturation={'{0-3}'}</UrlExample>
          <MasonryGrid>
            <ImageCard 
              title="Grayscale (0)"
              code="/300/200?image=0&saturation=0"
              imageUrl="/api/300/200?image=0&saturation=0"
              alt="Grayscale"
            />
            <ImageCard 
              title="Very Low (0.5)"
              code="/300/200?image=0&saturation=0.5"
              imageUrl="/api/300/200?image=0&saturation=0.5"
              alt="Very Low Saturation"
            />
            <ImageCard 
              title="Low (1)"
              code="/300/200?image=0&saturation=1"
              imageUrl="/api/300/200?image=0&saturation=1"
              alt="Low Saturation"
            />
            <ImageCard 
              title="Normal (1.5)"
              code="/300/200?image=0&saturation=1.5"
              imageUrl="/api/300/200?image=0&saturation=1.5"
              alt="Normal Saturation"
            />
            <ImageCard 
              title="High (2)"
              code="/300/200?image=0&saturation=2"
              imageUrl="/api/300/200?image=0&saturation=2"
              alt="High Saturation"
            />
            <ImageCard 
              title="Very High (2.5)"
              code="/300/200?image=0&saturation=2.5"
              imageUrl="/api/300/200?image=0&saturation=2.5"
              alt="Very High Saturation"
            />
            <ImageCard 
              title="Vivid (3)"
              code="/300/200?image=0&saturation=3"
              imageUrl="/api/300/200?image=0&saturation=3"
              alt="Vivid Saturation"
            />
          </MasonryGrid>
        </Section>

        <Section title="BLUR SCALE" className="sectionScroller">
          <UrlExample>GET /{'{width}'}/{'{height}'}?blur={'{0.3-20}'}</UrlExample>
          <MasonryGrid>
            <ImageCard 
              title="Sharp (0.3)"
              code="/300/200?image=1&blur=0.3"
              imageUrl="/api/300/200?image=1&blur=0.3"
              alt="Sharp"
            />
            <ImageCard 
              title="Very Soft (3)"
              code="/300/200?image=1&blur=3"
              imageUrl="/api/300/200?image=1&blur=3"
              alt="Very Soft Blur"
            />
            <ImageCard 
              title="Soft (7)"
              code="/300/200?image=1&blur=7"
              imageUrl="/api/300/200?image=1&blur=7"
              alt="Soft Blur"
            />
            <ImageCard 
              title="Medium (10)"
              code="/300/200?image=1&blur=10"
              imageUrl="/api/300/200?image=1&blur=10"
              alt="Medium Blur"
            />
            <ImageCard 
              title="Heavy (13)"
              code="/300/200?image=1&blur=13"
              imageUrl="/api/300/200?image=1&blur=13"
              alt="Heavy Blur"
            />
            <ImageCard 
              title="Very Heavy (17)"
              code="/300/200?image=1&blur=17"
              imageUrl="/api/300/200?image=1&blur=17"
              alt="Very Heavy Blur"
            />
            <ImageCard 
              title="Maximum (20)"
              code="/300/200?image=1&blur=20"
              imageUrl="/api/300/200?image=1&blur=20"
              alt="Maximum Blur"
            />
          </MasonryGrid>
        </Section>

        <Section title="CONTRAST SCALE" className="sectionScroller">
          <UrlExample>GET /{'{width}'}/{'{height}'}?contrast={'{0.1-3.0}'}</UrlExample>
          <MasonryGrid>
            <ImageCard 
              title="Flat (0.1)"
              code="/300/200?image=2&contrast=0.1"
              imageUrl="/api/300/200?image=2&contrast=0.1"
              alt="Flat Contrast"
            />
            <ImageCard 
              title="Very Low (0.5)"
              code="/300/200?image=2&contrast=0.5"
              imageUrl="/api/300/200?image=2&contrast=0.5"
              alt="Very Low Contrast"
            />
            <ImageCard 
              title="Low (1.0)"
              code="/300/200?image=2&contrast=1.0"
              imageUrl="/api/300/200?image=2&contrast=1.0"
              alt="Low Contrast"
            />
            <ImageCard 
              title="Normal (1.5)"
              code="/300/200?image=2&contrast=1.5"
              imageUrl="/api/300/200?image=2&contrast=1.5"
              alt="Normal Contrast"
            />
            <ImageCard 
              title="High (2.0)"
              code="/300/200?image=2&contrast=2.0"
              imageUrl="/api/300/200?image=2&contrast=2.0"
              alt="High Contrast"
            />
            <ImageCard 
              title="Very High (2.5)"
              code="/300/200?image=2&contrast=2.5"
              imageUrl="/api/300/200?image=2&contrast=2.5"
              alt="Very High Contrast"
            />
            <ImageCard 
              title="Maximum (3.0)"
              code="/300/200?image=2&contrast=3.0"
              imageUrl="/api/300/200?image=2&contrast=3.0"
              alt="Maximum Contrast"
            />
          </MasonryGrid>
        </Section>

        <Section title="TINT EXAMPLES" className="sectionScroller">
          <UrlExample>GET /{'{width}'}/{'{height}'}?tint={'{hex-color}'}</UrlExample>
          <MasonryGrid>
            <ImageCard 
              title="Red Tint"
              code="/300/200?image=0&tint=ff6b6b"
              imageUrl="/api/300/200?image=0&tint=ff6b6b"
              alt="Red Tint"
            />
            <ImageCard 
              title="Orange Tint"
              code="/300/200?image=0&tint=ff922b"
              imageUrl="/api/300/200?image=0&tint=ff922b"
              alt="Orange Tint"
            />
            <ImageCard 
              title="Yellow Tint"
              code="/300/200?image=0&tint=ffd93d"
              imageUrl="/api/300/200?image=0&tint=ffd93d"
              alt="Yellow Tint"
            />
            <ImageCard 
              title="Green Tint"
              code="/300/200?image=1&tint=51cf66"
              imageUrl="/api/300/200?image=1&tint=51cf66"
              alt="Green Tint"
            />
            <ImageCard 
              title="Blue Tint"
              code="/300/200?image=1&tint=4ecdc4"
              imageUrl="/api/300/200?image=1&tint=4ecdc4"
              alt="Blue Tint"
            />
            <ImageCard 
              title="Indigo Tint"
              code="/300/200?image=2&tint=748ffc"
              imageUrl="/api/300/200?image=2&tint=748ffc"
              alt="Indigo Tint"
            />
            <ImageCard 
              title="Purple Tint"
              code="/300/200?image=2&tint=ae3ec9"
              imageUrl="/api/300/200?image=2&tint=ae3ec9"
              alt="Purple Tint"
            />
          </MasonryGrid>
        </Section>

        <Section title="COMBINATIONS" className="sectionScroller">
          <MasonryGrid>
            <ImageCard 
              title="Grayscale + Blur"
              code="/300/200?image=0&saturation=0&blur=2"
              imageUrl="/api/300/200?image=0&saturation=0&blur=2"
              alt="Grayscale with Blur"
            />
            <ImageCard 
              title="Blur + Tint"
              code="/300/200?image=1&blur=4&tint=4ecdc4"
              imageUrl="/api/300/200?image=1&blur=4&tint=4ecdc4"
              alt="Blur with Teal Tint"
            />
            <ImageCard 
              title="Low Sat + Contrast"
              code="/300/200?image=2&saturation=0.5&contrast=1.8"
              imageUrl="/api/300/200?image=2&saturation=0.5&contrast=1.8"
              alt="Low Saturation with High Contrast"
            />
            <ImageCard 
              title="All Effects"
              code="/300/200?image=0&saturation=1.5&blur=1&tint=ffd93d&contrast=1.3"
              imageUrl="/api/300/200?image=0&saturation=1.5&blur=1&tint=ffd93d&contrast=1.3"
              alt="All Effects Combined"
            />
            <ImageCard 
              title="Vintage Look"
              code="/300/200?image=1&tint=8b4513&contrast=0.8&blur=0.5&saturation=0.7"
              imageUrl="/api/300/200?image=1&tint=8b4513&contrast=0.8&blur=0.5&saturation=0.7"
              alt="Vintage Effect"
            />
            <ImageCard 
              title="High Contrast B&W"
              code="/300/200?image=2&saturation=0&contrast=2.5&blur=1"
              imageUrl="/api/300/200?image=2&saturation=0&contrast=2.5&blur=1"
              alt="High Contrast Black & White"
            />
          </MasonryGrid>
        </Section>


      </div>
      
      <Footer />
    </div>
  );
}
