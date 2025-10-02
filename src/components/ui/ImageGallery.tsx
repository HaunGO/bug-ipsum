'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
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
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="relative">
        <div className="w-full h-[50vh] lg:h-[80vh] min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="image-gallery-hero">A buggy little placeholder image service.</h1>
          </div>
        </div>
      </section>
    );
  }

  return (
  <section className="relative">
    <div className="absolute top-[32%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
        <h1 className="image-gallery-hero"
        // className="text-2xl lg:text-5xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full px-4 py-2 lg:px-8 lg:py-3 text-center pointer-events-none shadow-2xl whitespace-nowrap"
        >A buggy little <br />placeholder <br />image service.
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
            <Image
              src={`/api/500/500?image=0`}
              alt={getImageByIndex(0)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">1</span>
            <Image
              src={`/api/500/500?image=1`}
              alt={getImageByIndex(1)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">2</span>
            <Image
              src={`/api/500/500?image=2`}
              alt={getImageByIndex(2)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">3</span>
            <Image
              src={`/api/500/500?image=3`}
              alt={getImageByIndex(3)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">4</span>
            <Image
              src={`/api/500/500?image=4`}
              alt={getImageByIndex(4)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">5</span>
            <Image
              src={`/api/500/500?image=5`}
              alt={getImageByIndex(5)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">6</span>
            <Image
              src={`/api/500/500?image=6`}
              alt={getImageByIndex(6)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
        </div>

        {/* Second Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">7</span>
            <Image
              src={`/api/500/500?image=7`}
              alt={getImageByIndex(7)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">8</span>
            <Image
              src={`/api/500/500?image=8`}
              alt={getImageByIndex(8)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">9</span>
            <Image
              src={`/api/500/500?image=9`}
              alt={getImageByIndex(9)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">10</span>
            <Image
              src={`/api/500/500?image=10`}
              alt={getImageByIndex(10)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">11</span>
            <Image
              src={`/api/500/500?image=11`}
              alt={getImageByIndex(11)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">12</span>
            <Image
              src={`/api/500/500?image=12`}
              alt={getImageByIndex(12)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">13</span>
            <Image
              src={`/api/500/500?image=13`}
              alt={getImageByIndex(13)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
        </div>

        {/* Third Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">14</span>
            <Image
              src={`/api/500/500?image=14`}
              alt={getImageByIndex(14)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">15</span>
            <Image
              src={`/api/500/500?image=15`}
              alt={getImageByIndex(15)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">16</span>
            <Image
              src={`/api/500/500?image=16`}
              alt={getImageByIndex(16)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">17</span>
            <Image
              src={`/api/500/500?image=17`}
              alt={getImageByIndex(17)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">18</span>
            <Image
              src={`/api/500/500?image=18`}
              alt={getImageByIndex(18)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">19</span>
            <Image
              src={`/api/500/500?image=19`}
              alt={getImageByIndex(19)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">20</span>
            <Image
              src={`/api/500/500?image=20`}
              alt={getImageByIndex(20)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
        </div>

        {/* Duplicate grids for seamless loop */}
        {/* First Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">21</span>
            <Image
              src={`/api/500/500?image=21`}
              alt={getImageByIndex(21)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">22</span>
            <Image
              src={`/api/500/500?image=22`}
              alt={getImageByIndex(22)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">23</span>
            <Image
              src={`/api/500/500?image=23`}
              alt={getImageByIndex(23)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">24</span>
            <Image
              src={`/api/500/500?image=24`}
              alt={getImageByIndex(24)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">25</span>
            <Image
              src={`/api/500/500?image=25`}
              alt={getImageByIndex(25)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">26</span>
            <Image
              src={`/api/500/500?image=26`}
              alt={getImageByIndex(26)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">0</span>
            <Image
              src={`/api/500/500?image=0`}
              alt={getImageByIndex(0)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
        </div>

        {/* Second Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">1</span>
            <Image
              src={`/api/500/500?image=1`}
              alt={getImageByIndex(1)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">2</span>
            <Image
              src={`/api/500/500?image=2`}
              alt={getImageByIndex(2)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">3</span>
            <Image
              src={`/api/500/500?image=3`}
              alt={getImageByIndex(3)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">4</span>
            <Image
              src={`/api/500/500?image=4`}
              alt={getImageByIndex(4)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">5</span>
            <Image
              src={`/api/500/500?image=5`}
              alt={getImageByIndex(5)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">6</span>
            <Image
              src={`/api/500/500?image=6`}
              alt={getImageByIndex(6)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">7</span>
            <Image
              src={`/api/500/500?image=7`}
              alt={getImageByIndex(7)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
        </div>

        {/* Third Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">8</span>
            <Image
              src={`/api/500/500?image=8`}
              alt={getImageByIndex(8)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">9</span>
            <Image
              src={`/api/500/500?image=9`}
              alt={getImageByIndex(9)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">10</span>
            <Image
              src={`/api/500/500?image=10`}
              alt={getImageByIndex(10)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="relative col-span-1 row-span-2">
            <span className="image-gallery-caption">11</span>
            <Image
              src={`/api/500/500?image=11`}
              alt={getImageByIndex(11)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">12</span>
            <Image
              src={`/api/500/500?image=12`}
              alt={getImageByIndex(12)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="relative col-span-1 row-span-1">
            <span className="image-gallery-caption">13</span>
            <Image
              src={`/api/500/500?image=13`}
              alt={getImageByIndex(13)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="relative col-span-2 row-span-1">
            <span className="image-gallery-caption">14</span>
            <Image
              src={`/api/500/500?image=14`}
              alt={getImageByIndex(14)}
              width={500}
              height={500}
              className="object-cover w-full h-full rounded"
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
} 