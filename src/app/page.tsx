import { Section } from '@/components/ui/Section';
import { CardBox } from '@/components/ui/CardBox';
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
        
        {/* <Section title="SOURCE IMAGES" className="">
          <ImageGallery title="SOURCE IMAGES" />
        </Section> */}

        <Section title="BASIC USAGE" className="">
          <UrlExample>/{'{width}'}/{'{height}'}</UrlExample>
          <CardBox variant="scroll">
            <ImageCard 
              width={500}
              height={300}
              title="Landscape"
              caption="/500/300"
              src="/api/500/300"
            />
            <ImageCard 
              width={300}
              height={300}
              title="Square"
              caption="/300/300"
              src="/api/300/300"
            />
            <ImageCard 
              width={100}
              height={300}
              title="Portrait"
              caption="/100/300"
              src="/api/100/300"
            />
            <ImageCard 
              width={800}
              height={300}
              title="Wide"
              caption="/800/300"
              src="/api/800/300"
            />
          </CardBox>
        </Section>
{/* 
        <Section title="IMAGE SELECTION" className="">
          <UrlExample>?image={'{index}'}</UrlExample>
          <CardBox variant="scroll">
            <ImageCard 
              width={300}
              height={200}
              title="Image 0"
              caption="GET /300/200?image=0"
              src="/api/300/200?image=0"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Image 1"
              caption="GET /300/200?image=1"
              src="/api/300/200?image=1"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Image 2"
              caption="GET /300/200?image=2"
              src="/api/300/200?image=2"
            />
          </CardBox>
        </Section>
         */}


        <Section title="SATURATION SCALE" className="">
          <UrlExample>?saturation={'{0-3}'}</UrlExample>
          <CardBox variant="fit">
            <ImageCard 
              width={300}
              height={200}
              title="Grayscale"
              caption="?saturation=0"
              src="/api/300/200?image=0&saturation=0"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Very Low"
              caption="?saturation=0.5"
              src="/api/300/200?image=0&saturation=0.5"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Low"
              caption="?saturation=1"
              src="/api/300/200?image=0&saturation=1"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Normal"
              caption="?saturation=1.5"
              src="/api/300/200?image=0&saturation=1.5"
            />
            <ImageCard 
              width={300}
              height={200}
              title="High"
              caption="?saturation=2"
              src="/api/300/200?image=0&saturation=2"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Very High"
              caption="?saturation=2.5"
              src="/api/300/200?image=0&saturation=2.5"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Vivid"
              caption="?saturation=3"
              src="/api/300/200?image=0&saturation=3"
            />
          </CardBox>
        </Section>

        <Section title="BLUR SCALE" className="">
          <UrlExample>?blur={'{0.3-20}'}</UrlExample>
          <CardBox variant="fit">
            <ImageCard 
              width={300}
              height={200}
              title="Sharp"
              caption="?blur=0.3"
              src="/api/300/200?image=1&blur=0.3"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Very Soft"
              caption="?blur=3"
              src="/api/300/200?image=1&blur=3"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Soft"
              caption="?blur=7"
              src="/api/300/200?image=1&blur=7"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Medium"
              caption="?blur=10"
              src="/api/300/200?image=1&blur=10"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Heavy"
              caption="?blur=13"
              src="/api/300/200?image=1&blur=13"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Very Heavy"
              caption="?blur=17"
              src="/api/300/200?image=1&blur=17"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Maximum"
              caption="?blur=20"
              src="/api/300/200?image=1&blur=20"
            />
          </CardBox>
        </Section>

        <Section title="CONTRAST SCALE" className="">
          <UrlExample>?contrast={'{0.1-3.0}'}</UrlExample>
          <CardBox variant="fit">
            <ImageCard 
              width={300}
              height={200}
              title="Flat"
              caption="?contrast=0.1"
              src="/api/300/200?image=2&contrast=0.1"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Very Low"
              caption="?contrast=0.5"
              src="/api/300/200?image=2&contrast=0.5"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Low"
              caption="?contrast=1.0"
              src="/api/300/200?image=2&contrast=1.0"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Normal"
              caption="?contrast=1.5"
              src="/api/300/200?image=2&contrast=1.5"
            />
            <ImageCard 
              width={300}
              height={200}
              title="High"
              caption="?contrast=2.0"
              src="/api/300/200?image=2&contrast=2.0"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Very High"
              caption="?contrast=2.5"
              src="/api/300/200?image=2&contrast=2.5"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Maximum"
              caption="?contrast=3.0"
              src="/api/300/200?image=2&contrast=3.0"
            />
          </CardBox>
        </Section>

        <Section title="TINT EXAMPLES" className="">
          <UrlExample>?tint={'{hex-color}'}</UrlExample>
          <CardBox variant="fit">
            <ImageCard 
              width={200}
              height={150}
              title="Red"
              caption="?tint=ff6b6b"
              src="/api/300/200?image=0&tint=ff6b6b"
            />
            <ImageCard 
              width={200}
              height={150}
              title="Orange"
              caption="?tint=ff922b"
              src="/api/300/200?image=0&tint=ff922b"
            />
            <ImageCard 
              width={200}
              height={150}
              title="Yellow"
              caption="?tint=ffd93d"
              src="/api/300/200?image=0&tint=ffd93d"
            />
            <ImageCard 
              width={200}
              height={150}
              title="Green"
              caption="?tint=51cf66"
              src="/api/300/200?image=0&tint=51cf66"
            />
            <ImageCard 
              width={200}
              height={150}
              title="Blue"
              caption="?tint=4ecdc4"
              src="/api/300/200?image=0&tint=4ecdc4"
            />
            <ImageCard 
              width={200}
              height={150}
              title="Indigo"
              caption="?tint=748ffc"
              src="/api/300/200?image=0&tint=748ffc"
            />
            <ImageCard 
              width={200}
              height={150}
              title="Purple"
              caption="?tint=ae3ec9"
              src="/api/300/200?image=0&tint=ae3ec9"
            />
          </CardBox>
        </Section>

        <Section title="COMBINATIONS" className="">
          <CardBox variant="wrap">
            <ImageCard 
              width={300}
              height={200}
              title="Grayscale + Blur"
              caption="?saturation=0&blur=2"
              src="/api/300/200?image=0&saturation=0&blur=2"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Low Sat + Contrast"
              caption="?saturation=0.5&contrast=1.8"
              src="/api/300/200?image=2&saturation=0.5&contrast=1.8"
            />
            <ImageCard 
              width={300}
              height={200}
              title="All Effects"
              caption="?saturation=1.5&blur=1&tint=ffd93d&contrast=1.3"
              src="/api/300/200?image=0&saturation=1.5&blur=1&tint=ffd93d&contrast=1.3"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Vintage Look"
              caption="?tint=8b4513&contrast=0.8&blur=0.5&saturation=0.7"
              src="/api/300/200?image=1&tint=8b4513&contrast=0.8&blur=0.5&saturation=0.7"
            />
            <ImageCard 
              width={300}
              height={200}
              title="High Contrast B&W"
              caption="?saturation=0&contrast=2.5&blur=1"
              src="/api/300/200?image=2&saturation=0&contrast=2.5&blur=1"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Cyberpunk"
              caption="?saturation=2.5&contrast=2&tint=00ffff"
              src="/api/300/200?image=2&saturation=2.5&contrast=2&tint=00ffff"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Desert Heat"
              caption="?saturation=2&contrast=1.8&tint=ff8533&blur=0.8"
              src="/api/300/200?image=0&saturation=2&contrast=1.8&tint=ff8533&blur=0.8"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Moonlight"
              caption="?saturation=0.7&contrast=1.2&tint=3d3d5c&blur=1.5"
              src="/api/300/200?image=1&saturation=0.7&contrast=1.2&tint=3d3d5c&blur=1.5"
            />



          </CardBox>
        </Section>


      </div>
      
      <Footer />
    </div>
  );
}
