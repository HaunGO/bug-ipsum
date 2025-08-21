import { Section } from '@/components/ui/Section';
import { CardBox } from '@/components/ui/CardBox';
import { ImageCard } from '@/components/ui/ImageCard';
// import { UrlExample } from '@/components/ui/UrlExample';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { Header } from '@/components/ui/Header';
// import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Footer } from '@/components/ui/Footer';

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header 
          title="Bug Ipsum"
          subtitle="A buggy placeholder image service featuring real bug photography."
          className=""
        />
      </div>        

      <ImageGallery />

{/* <Image src="/images/logo.png" alt="logo" width={100} height={100} />  */}


<div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        <Section title="Basic Width/Height" className="">
          <h2>Basic <code>/{'{width}'}/{'{height}'}</code></h2>
          <CardBox variant="scroll">
          
            {/* <ImageCard  /> */}

            <ImageCard 
              width={300}
              height={300}
              title="Default"
              caption="/api"
              src="/api/300/300?image=6"
            />

            <ImageCard 
              width={100}
              height={300}
              title="Tall"
              caption="/100/300"
              src="/api/100/300?image=19" />

            <ImageCard 
              width={800}
              height={300}
              title="Wide"
              caption="/800/300"
              src="/api/800/300?image=16"
            />
          </CardBox>
        </Section>



        <Section title="Saturation" className="">
          <h2>Saturation <code>?saturation={'{1-9}'}</code></h2>
          <CardBox variant="fit">
            <ImageCard 
              width={400}
              height={250}
              title="Min"
              caption="?saturation=1"
              src="/api/300/251?image=6&saturation=1"
            />
            <ImageCard 
              width={400}
              height={251}
              title="Mid"
              caption="?saturation=3"
              src="/api/300/251?image=6&saturation=3"
            />
            <ImageCard 
              width={400}
              height={251}
              title="Max"
              caption="?saturation=9"
              src="/api/300/251?image=6&saturation=9"
            />
          </CardBox>
        </Section>


        <Section title="Blur" className="">
          <h2>Blur <code>?blur={'{1-9}'}</code></h2>
          <CardBox variant="fit">
            <ImageCard 
              width={300}
              height={300}
              title="Min"
              caption="?blur=1"
              src="/api/300/300?image=14&blur=1"
            />
            <ImageCard 
              width={300}
              height={300}
              title="Low"
              caption="?blur=3"
              src="/api/300/300?image=14&blur=3"
            />
            <ImageCard 
              width={300}
              height={300}
              title="Mid"
              caption="?blur=6"
              src="/api/300/300?image=14&blur=6"
            />

            {/* <ImageCard 
              width={300}
              height={300}
              title="High"
              caption="?blur=7"
              src="/api/300/300?image=25&blur=7"
            /> */}
            <ImageCard 
              width={300}
              height={300}
              title="Max"
              caption="?blur=9"
              src="/api/300/300?image=14&blur=9"
            />
          </CardBox>
        </Section>


        <Section title="Contrast" className="">
          <h2>Contrast <code>?contrast={'{1-9}'}</code></h2>
          <CardBox variant="fit">
            <ImageCard 
              width={300}
              height={300}
              title="Min"
              caption="?contrast=2"
              src="/api/300/300?image=10&contrast=2"
            />
            <ImageCard 
              width={300}
              height={300}
              title="Low"
              caption="?contrast=3"
              src="/api/300/300?image=10&contrast=3"
            />
            <ImageCard 
              width={300}
              height={300}
              title="Mid"
              caption="?contrast=5"
              src="/api/300/300?image=10&contrast=5"
            />

            <ImageCard 
              width={300}
              height={300}
              title="High"
              caption="?contrast=7"
              src="/api/300/300?image=10&contrast=7"
            />
            {/* <ImageCard 
              width={300}
              height={300}
              title="Higher"
              caption="?contrast=7"
              src="/api/300/300?image=10&contrast=7"
            /> */}
            <ImageCard 
              width={300}
              height={300}
              title="Max"
              caption="?contrast=9"
              src="/api/300/300?image=10&contrast=9"
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




        <Section title="Examples" className="">
          <h2>Preset Styles</h2>
          <CardBox variant="wrap">
            <ImageCard 
              width={300}
              height={200}
              title="Desaturated + Blur"
              caption="?saturation=1 &blur=2"
              src="/api/300/200?image=6&saturation=1&blur=2"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Low Sat + Contrast"
              caption="?saturation=2  &contrast=8"
              src="/api/300/200?image=14&saturation=2&contrast=8"
            />
            <ImageCard 
              width={300}
              height={200}
              title="All Effects"
              caption="?saturation=6 &blur=2 &tint=ffd93d  &contrast=6"
              src="/api/300/200?image=4&saturation=6&blur=2&tint=ffd93d&contrast=6"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Vintage Look"
              caption="?tint=8b4513 &contrast=3  &blur=2 &saturation=3"
              src="/api/300/200?image=16&tint=8b4513&contrast=3&blur=2&saturation=3"
            />
            <ImageCard 
              width={300}
              height={200}
              title="High Contrast B&W"
              caption="?saturation=1  &contrast=8 &blur=2"
              src="/api/300/200?image=25&saturation=1&contrast=8&blur=2"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Cyberpunk"
              caption="?saturation=8 &contrast=7 &blur=2 &tint=00ffff"
              src="/api/300/200?image=14&saturation=8&contrast=7&tint=00ffff"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Desert Heat"
              caption="?saturation=7 &contrast=7 &tint=ff8533 &blur=2"
              src="/api/300/200?image=4&saturation=7&contrast=7&tint=ff8533&blur=2"
            />
            <ImageCard 
              width={300}
              height={200}
              title="Moonlight"
              caption="?saturation=4 &contrast=6 &tint=3d3d5c &blur=1"
              src="/api/300/200?image=6&saturation=4&contrast=6&tint=3d3d5c&blur=1"
            />

          </CardBox>
        </Section>

        <Section title="Sample URLs">
          <h2>Ready-to-use examples</h2>
          <div>
            
            {/* Basic Examples */}
            <div>
              <h3>Basic Sizes</h3>
              <div>
                <div><a href="/api">/api</a> - Default square</div>
                <div><a href="/api/400/600">/api/400/600</a> - Portrait</div>
                <div><a href="/api/800/400">/api/800/400</a> - Landscape</div>
                <div><a href="/api/200/200">/api/200/200</a> - Small square</div>
              </div>
            </div>

            {/* Color Effects */}
            <div>
              <h3>Color Tints</h3>
              <div>
                <div><a href="/api/400/300?tint=ff6b6b">/api/400/300?tint=ff6b6b</a> - Red</div>
                <div><a href="/api/400/300?tint=4ecdc4">/api/400/300?tint=4ecdc4</a> - Ocean blue</div>
                <div><a href="/api/400/300?tint=ff922b">/api/400/300?tint=ff922b</a> - Orange</div>
                <div><a href="/api/400/300?tint=ae3ec9">/api/400/300?tint=ae3ec9</a> - Purple</div>
              </div>
            </div>

            {/* Single Effects */}
            <div>
              <h3>Single Effects</h3>
              <div>
                <div><a href="/api/400/300?saturation=9">/api/400/300?saturation=9</a> - Max saturation</div>
                <div><a href="/api/400/300?blur=8">/api/400/300?blur=8</a> - Heavy blur</div>
                <div><a href="/api/400/300?contrast=9">/api/400/300?contrast=9</a> - High contrast</div>
                <div><a href="/api/400/300?saturation=1">/api/400/300?saturation=1</a> - Desaturated</div>
              </div>
            </div>

            {/* Bug-Themed Preset Combos */}
            <div>
              <h3>Bug-Themed Styles</h3>
              <div>
                <div><a href="/api/500/300?saturation=8&contrast=7&blur=2&tint=00ffff">/api/500/300?saturation=8&contrast=7&blur=2&tint=00ffff</a> - Neon bug</div>
                <div><a href="/api/500/300?tint=8b4513&contrast=3&blur=2&saturation=3">/api/500/300?tint=8b4513&contrast=3&blur=2&saturation=3</a> - Vintage specimen</div>
                <div><a href="/api/500/300?saturation=7&contrast=7&tint=ff8533&blur=2">/api/500/300?saturation=7&contrast=7&tint=ff8533&blur=2</a> - Desert bug</div>
                <div><a href="/api/500/300?saturation=9&contrast=8&tint=ff0000&blur=1">/api/500/300?saturation=9&contrast=8&tint=ff0000&blur=1</a> - Creepy crawler</div>
              </div>
            </div>

            {/* Specific Bug Examples */}
            <div>
              <h3>Specific Bug Examples</h3>
              <div>
                <div><a href="/api/400/300?image=6">/api/400/300?image=6</a> - Ladybug</div>
                <div><a href="/api/400/300?image=16">/api/400/300?image=16</a> - Tarantula</div>
                <div><a href="/api/400/300?image=14">/api/400/300?image=14</a> - Jumping spider</div>
                <div><a href="/api/400/300?image=4">/api/400/300?image=4</a> - Cotton candy moth</div>
                <div><a href="/api/400/300?image=25">/api/400/300?image=25</a> - Big fly</div>
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h3>Common Use Cases</h3>
              <div>
                <div><a href="/api/150/150?blur=3&saturation=6">/api/150/150?blur=3&saturation=6</a> - Bug avatar</div>
                <div><a href="/api/1200/400?tint=6366f1&saturation=5&contrast=6">/api/1200/400?tint=6366f1&saturation=5&contrast=6</a> - Entomology banner</div>
                <div><a href="/api/280/200?blur=1&saturation=7">/api/280/200?blur=1&saturation=7</a> - Bug thumbnail</div>
              </div>
            </div>

            {/* API Info */}
            <div>
              <h3>API Reference</h3>
              <div>
                <div><strong>Format:</strong> <code>/api/width/height</code></div>
                <div><strong>Parameters:</strong></div>
                <div>• <code>saturation=1-9</code></div>
                <div>• <code>blur=1-9</code></div>
                <div>• <code>contrast=1-9</code></div>
                <div>• <code>tint=hexcolor</code></div>
                <div>• <code>image=0-26</code> (27 different bug images available)</div>
              </div>
            </div>

          </div>
        </Section>

      </div>
      
      <Footer />
    </div>
  );
}
