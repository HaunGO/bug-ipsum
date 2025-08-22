'use client';

import { useEffect, useRef } from 'react';
import { bugImages, getImageByIndex } from '@/lib/bug-images';
import { gsap } from '@/lib/gsap';

// ===== ANIMATION CONFIGURATION VARIABLES =====
// Adjust these values to customize the scrolling behavior

// Speed and Timing
const ANIMATION_SPEED = 90; // Duration in seconds for one complete back-and-forth cycle

// Scroll Range and Behavior
const SCROLL_RANGE_PERCENT = 60; // Percentage of content width to scroll (0-100)

// Easing and Animation Style
const EASING_FUNCTION = 'power1.inOut'; // GSAP easing: 'none', 'power1.inOut', 'power2.inOut', 'back.inOut', etc.

// Performance and Responsiveness
const MANUAL_SCROLL_THRESHOLD = 5; // Minimum scroll delta to detect manual scrolling
const RESUME_DELAY = 500; // Milliseconds to wait before resuming after manual scroll

// ===== END CONFIGURATION VARIABLES =====

export function ImageGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isUserScrollingRef = useRef(false);
  const lastScrollLeftRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const content = contentRef.current;
    
    if (!scrollContainer || !content || bugImages.length === 0) return;

    // Calculate scroll range based on configuration
    const maxScrollWidth = content.scrollWidth - scrollContainer.clientWidth;
    const scrollRange = (maxScrollWidth * SCROLL_RANGE_PERCENT) / 100;
    
    // Set initial position
    scrollContainer.scrollLeft = 0;
    
    // Create the back-and-forth animation timeline
    const createAnimation = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        ease: EASING_FUNCTION,
        onUpdate: () => {
          if (scrollContainer && !isUserScrollingRef.current) {
            scrollContainer.scrollLeft = tl.progress() * scrollRange;
          }
        }
      });

      // Animate to the right
      tl.to({}, {
        duration: ANIMATION_SPEED / 2,
        ease: EASING_FUNCTION,
        onUpdate: () => {
          if (scrollContainer && !isUserScrollingRef.current) {
            const progress = tl.progress();
            scrollContainer.scrollLeft = progress * scrollRange;
          }
        }
      });

      // Animate back to the left (yoyo will handle this automatically)
      animationRef.current = tl;
      isAnimatingRef.current = true;
    };

    // Start the animation
    createAnimation();
    
    // Handle manual scrolling
    const handleScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft;
      const scrollDelta = currentScrollLeft - lastScrollLeftRef.current;
      
      if (Math.abs(scrollDelta) > MANUAL_SCROLL_THRESHOLD) {
        isUserScrollingRef.current = true;
        
        // Pause the animation
        if (animationRef.current) {
          animationRef.current.pause();
        }
        
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Keep animation paused after manual scroll
        scrollTimeoutRef.current = setTimeout(() => {
          isUserScrollingRef.current = false;
          // Animation stays paused - user can restart by refreshing or implementing a restart mechanism
        }, RESUME_DELAY);
      }
      
      lastScrollLeftRef.current = currentScrollLeft;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Show empty state if no images
  if (bugImages.length === 0) {
    return (
      <section className="relative">
        <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
           <h1 
            className="text-2xl lg:text-5xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full p-4 lg:p-8 text-center pointer-events-none shadow-2xl whitespace-nowrap"
            >No bug images found.
           </h1>
        </div>
        <div className="h-[50vh] lg:h-[80vh] min-h-[300px] flex items-center justify-center">
          <div className="text-gray-500">No images available in bugs/only directory</div>
        </div>
      </section>
    );
  }

  return (
      <section className="relative">
        <div className="absolute top-[32%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
           <h1 
            className="text-2xl lg:text-5xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full px-4 py-2 lg:px-8 lg:py-3 text-center pointer-events-none shadow-2xl whitespace-nowrap"
            >A buggy little placeholder image service.
           </h1>
        </div>

    <div 
      ref={scrollContainerRef}
      className="relative w-full overflow-x-auto pb-4 h-[50vh] lg:h-[80vh] min-h-[300px]"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
      <div 
        ref={contentRef}
        className="flex flex-nowrap gap-2 h-full"
      >
        {/* First Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">0</span>
            <img
              src={`/api/500/500?image=0`}
              alt={getImageByIndex(0)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">1</span>
            <img
              src={`/api/500/500?image=1`}
              alt={getImageByIndex(1)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">2</span>
            <img
              src={`/api/500/500?image=2`}
              alt={getImageByIndex(2)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">3</span>
            <img
              src={`/api/500/500?image=3`}
              alt={getImageByIndex(3)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">4</span>
            <img
              src={`/api/500/500?image=4`}
              alt={getImageByIndex(4)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">5</span>
            <img
              src={`/api/500/500?image=5`}
              alt={getImageByIndex(5)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">6</span>
            <img
              src={`/api/500/500?image=6`}
              alt={getImageByIndex(6)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Second Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">7</span>
            <img
              src={`/api/500/500?image=7`}
              alt={getImageByIndex(7)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">8</span>
            <img
              src={`/api/500/500?image=8`}
              alt={getImageByIndex(8)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">9</span>
            <img
              src={`/api/500/500?image=9`}
              alt={getImageByIndex(9)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">10</span>
            <img
              src={`/api/500/500?image=10`}
              alt={getImageByIndex(10)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">11</span>
            <img
              src={`/api/500/500?image=11`}
              alt={getImageByIndex(11)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">12</span>
            <img
              src={`/api/500/500?image=12`}
              alt={getImageByIndex(12)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">13</span>
            <img
              src={`/api/500/500?image=13`}
              alt={getImageByIndex(13)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Third Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">14</span>
            <img
              src={`/api/500/500?image=14`}
              alt={getImageByIndex(14)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">15</span>
            <img
              src={`/api/500/500?image=15`}
              alt={getImageByIndex(15)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">16</span>
            <img
              src={`/api/500/500?image=16`}
              alt={getImageByIndex(16)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">17</span>
            <img
              src={`/api/500/500?image=17`}
              alt={getImageByIndex(17)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">18</span>
            <img
              src={`/api/500/500?image=18`}
              alt={getImageByIndex(18)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">19</span>
            <img
              src={`/api/500/500?image=19`}
              alt={getImageByIndex(19)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">20</span>
            <img
              src={`/api/500/500?image=20`}
              alt={getImageByIndex(20)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Duplicate grids for seamless loop */}
        {/* First Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">21</span>
            <img
              src={`/api/500/500?image=21`}
              alt={getImageByIndex(21)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">22</span>
            <img
              src={`/api/500/500?image=22`}
              alt={getImageByIndex(22)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">23</span>
            <img
              src={`/api/500/500?image=23`}
              alt={getImageByIndex(23)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">24</span>
            <img
              src={`/api/500/500?image=24`}
              alt={getImageByIndex(24)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">25</span>
            <img
              src={`/api/500/500?image=25`}
              alt={getImageByIndex(25)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">26</span>
            <img
              src={`/api/500/500?image=26`}
              alt={getImageByIndex(26)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">0</span>
            <img
              src={`/api/500/500?image=0`}
              alt={getImageByIndex(0)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Second Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">1</span>
            <img
              src={`/api/500/500?image=1`}
              alt={getImageByIndex(1)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">2</span>
            <img
              src={`/api/500/500?image=2`}
              alt={getImageByIndex(2)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">3</span>
            <img
              src={`/api/500/500?image=3`}
              alt={getImageByIndex(3)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">4</span>
            <img
              src={`/api/500/500?image=4`}
              alt={getImageByIndex(4)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">5</span>
            <img
              src={`/api/500/500?image=5`}
              alt={getImageByIndex(5)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">6</span>
            <img
              src={`/api/500/500?image=6`}
              alt={getImageByIndex(6)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">7</span>
            <img
              src={`/api/500/500?image=7`}
              alt={getImageByIndex(7)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Third Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">8</span>
            <img
              src={`/api/500/500?image=8`}
              alt={getImageByIndex(8)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">9</span>
            <img
              src={`/api/500/500?image=9`}
              alt={getImageByIndex(9)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">10</span>
            <img
              src={`/api/500/500?image=10`}
              alt={getImageByIndex(10)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">11</span>
            <img
              src={`/api/500/500?image=11`}
              alt={getImageByIndex(11)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">12</span>
            <img
              src={`/api/500/500?image=12`}
              alt={getImageByIndex(12)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">13</span>
            <img
              src={`/api/500/500?image=13`}
              alt={getImageByIndex(13)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">14</span>
            <img
              src={`/api/500/500?image=14`}
              alt={getImageByIndex(14)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
} 