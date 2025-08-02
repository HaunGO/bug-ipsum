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
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Header 
          title="Bug Ipsum"
          subtitle="A buggy image generator"
          className="mb-12"
        />
        
        {/* <Section title="SOURCE IMAGES" className="">
          <ImageGallery title="SOURCE IMAGES" />
        </Section> */}

        <Section title="Basic Width/Height" className="">
          <h2>Basic <code>/{'{width}'}/{'{height}'}</code></h2>
          <CardBox variant="scroll">
          
            {/* <ImageCard  /> */}

            <ImageCard 
              width={300}
              height={300}
              title="Default"
              caption="/api"
              src="/api/300/300?image=1"
            />

            <ImageCard 
              width={100}
              height={300}
              title="Tall"
              caption="/100/300"
              src="/api/100/300?image=2"
            />

            <ImageCard 
              width={800}
              height={300}
              title="Wide"
              caption="/800/300"
              src="/api/800/300?image=0"
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

<Section title="Blur" className="">
          <h2>Blur <code>?blur={'{1-9}'}</code></h2>
          <CardBox variant="fit">
            <ImageCard 
              width={300}
              height={300}
              title="Min"
              caption="?blur=1"
              src="/api/300/300?image=1&blur=1"
            />
            <ImageCard 
              width={300}
              height={300}
              title="Low"
              caption="?blur=3"
              src="/api/300/300?image=1&blur=3"
            />

            <ImageCard 
              width={300}
              height={300}
              title="High"
              caption="?blur=7"
              src="/api/300/300?image=1&blur=7"
            />
            <ImageCard 
              width={300}
              height={300}
              title="Max"
              caption="?blur=9"
              src="/api/300/300?image=1&blur=9"
            />
          </CardBox>
        </Section>


        <Section title="Saturation" className="">
          <h2>Saturation <code>?saturation={'{1-9}'}</code></h2>
          <CardBox variant="fit">
            <ImageCard 
              width={250}
              height={300}
              title="None"
              caption="?saturation=1"
              src="/api/250/300?image=0&saturation=1"
            />
            <ImageCard 
              width={250}
              height={300}
              title="Low"
              caption="?saturation=2"
              src="/api/250/300?image=0&saturation=2"
            />
            <ImageCard 
              width={250}
              height={300}
              title="Mild"
              caption="?saturation=3"
              src="/api/250/300?image=0&saturation=3"
            />
            <ImageCard 
              width={250}
              height={300}
              title="High"
              caption="?saturation=7"
              src="/api/250/300?image=0&saturation=7"
            />
            <ImageCard 
              width={250}
              height={300}
              title="Max"
              caption="?saturation=9"
              src="/api/250/300?image=0&saturation=9"
            />
          </CardBox>
        </Section>

        <Section title="Contrast" className="">
          <h2>Contrast <code>?contrast={'{1-9}'}</code></h2>
          <CardBox variant="fit">
            <ImageCard 
              width={200}
              height={300}
              title="Min"
              caption="?contrast=1"
              src="/api/200/300?image=2&contrast=1"
            />
            <ImageCard 
              width={200}
              height={300}
              title="Low"
              caption="?contrast=2"
              src="/api/200/300?image=2&contrast=2"
            />
            <ImageCard 
              width={200}
              height={300}
              title="Medium"
              caption="?contrast=3"
              src="/api/200/300?image=2&contrast=3"
            />

            <ImageCard 
              width={200}
              height={300}
              title="High"
              caption="?contrast=7"
              src="/api/200/300?image=2&contrast=7"
            />
            <ImageCard 
              width={200}
              height={300}
              title="Higher"
              caption="?contrast=8"
              src="/api/200/300?image=2&contrast=8"
            />
            <ImageCard 
              width={200}
              height={300}
              title="Max"
              caption="?contrast=9"
              src="/api/200/300?image=2&contrast=9"
            />
          </CardBox>
        </Section>

        <Section title="Tint of Color" className="">
          <h2>Tint of Color <code>?tint={'{hex-color}'}</code></h2>
          <CardBox variant="fit">
            <ImageCard 
              width={200}
              height={30}
              title="Red"
              caption="?tint=ff6b6b"
              src="/api/200/300?image=0&tint=ff6b6b"
            />
            <ImageCard 
              width={200}
              height={30}
              title="Orange"
              caption="?tint=ff922b"
              src="/api/200/300?image=0&tint=ff922b"
            />
            <ImageCard 
              width={200}
              height={30}
              title="Yellow"
              caption="?tint=ffd93d"
              src="/api/200/300?image=0&tint=ffd93d"
            />
            <ImageCard 
              width={200}
              height={30}
              title="Green"
              caption="?tint=51cf66"
              src="/api/200/300?image=0&tint=51cf66"
            />
            <ImageCard 
              width={200}
              height={30}
              title="Blue"
              caption="?tint=4ecdc4"
              src="/api/200/300?image=0&tint=4ecdc4"
            />
            <ImageCard 
              width={200}
              height={30}
              title="And"
              caption="?tint=6366f1"
              src="/api/200/300?image=0&tint=6366f1"
            />
            <ImageCard 
              width={200}
              height={30}
              title="Purple"
              caption="?tint=ae3ec9"
              src="/api/200/300?image=0&tint=ae3ec9"
            />
          </CardBox>
        </Section>

        <Section title="Combinations" className="">
          <h2>Preset Styles</h2>
          <CardBox variant="wrap">
            <ImageCard 
              width={300}
              height={200}
              title="Desaturated + Blur"
              caption="?saturation=1 &blur=2"
              src="/api/300/200?image=0&saturation=1&blur=2"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Low Sat + Contrast"
              caption="?saturation=2  &contrast=8"
              src="/api/300/200?image=2&saturation=2&contrast=8"
            />
            <ImageCard 
              width={300}
              height={200}
              title="All Effects"
              caption="?saturation=6 &blur=2 &tint=ffd93d  &contrast=6"
              src="/api/300/200?image=0&saturation=6&blur=2&tint=ffd93d&contrast=6"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Vintage Look"
              caption="?tint=8b4513 &contrast=3  &blur=2 &saturation=3"
              src="/api/300/200?image=1&tint=8b4513&contrast=3&blur=2&saturation=3"
            />
            <ImageCard 
              width={300}
              height={200}
              title="High Contrast B&W"
              caption="?saturation=1  &contrast=8 &blur=2"
              src="/api/300/200?image=2&saturation=1&contrast=8&blur=2"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Cyberpunk"
              caption="?saturation=8 &contrast=7 &blur=2 &tint=00ffff"
              src="/api/300/200?image=2&saturation=8&contrast=7&tint=00ffff"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Desert Heat"
              caption="?saturation=7 &contrast=7 &tint=ff8533 &blur=2"
              src="/api/300/200?image=0&saturation=7&contrast=7&tint=ff8533&blur=2"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Moonlight"
              caption="?saturation=4 &contrast=6 &tint=3d3d5c &blur=1"
              src="/api/300/200?image=1&saturation=4&contrast=6&tint=3d3d5c&blur=1"
            />

          </CardBox>
        </Section>


      </div>
      
      <Footer />
    </div>
  );
}
