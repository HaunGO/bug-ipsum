'use client';

import { ImageCard } from './ImageCard';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { bugImages, getImageByIndex } from '@/lib/bug-images';

interface ImageGalleryProps {
  title?: string;
}

export function ImageGallery({ title = "" }: ImageGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isUserScrollingRef = useRef(false);
  const lastScrollLeftRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationDurationRef = useRef(100);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const content = contentRef.current;
    
    if (!scrollContainer || !content || bugImages.length === 0) return;

    // For seamless loop, we scroll exactly half the content width (since content is duplicated)
    const halfWidth = content.scrollWidth / 2;
    
    // Set initial position
    scrollContainer.scrollLeft = 0;
    
    // Create seamless infinite scroll
    const scrollTimeline = gsap.timeline({ repeat: -1 });
    scrollTimelineRef.current = scrollTimeline;
    
    const animateScroll = (startFrom?: number) => {
      if (isUserScrollingRef.current) return;
      
      // Kill any existing animation
      scrollTimeline.kill();
      
      // Create new timeline
      const newTimeline = gsap.timeline({ repeat: -1 });
      scrollTimelineRef.current = newTimeline;
      
      const startPosition = startFrom !== undefined ? startFrom : scrollContainer.scrollLeft;
      const targetPosition = startPosition + halfWidth;
      
      // Calculate remaining duration based on progress
      const progress = startPosition / halfWidth;
      const remainingDuration = animationDurationRef.current * (1 - progress);
      
      newTimeline.to(scrollContainer, {
        scrollLeft: targetPosition,
        duration: remainingDuration,
        ease: "none",
        onComplete: () => {
          // Reset to start position for seamless loop
          scrollContainer.scrollLeft = 0;
          // Start next cycle
          animateScroll(0);
        }
      });
    };

    // Start the animation
    animateScroll();

    // Handle manual scrolling
    const handleScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft;
      const scrollDelta = Math.abs(currentScrollLeft - lastScrollLeftRef.current);
      
      // If user is scrolling manually (significant scroll delta)
      if (scrollDelta > 5) {
        isUserScrollingRef.current = true;
        
        // Pause current animation
        if (scrollTimelineRef.current) {
          scrollTimelineRef.current.pause();
        }
        
        // Resume animation after user stops scrolling
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isUserScrollingRef.current = false;
          // Resume from current position
          animateScroll(currentScrollLeft);
        }, 1500); // Wait 1.5 seconds after user stops scrolling
      }
      
      lastScrollLeftRef.current = currentScrollLeft;
    };

    // Add scroll event listener
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollTimelineRef.current) {
        scrollTimelineRef.current.kill();
      }
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
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
        <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
           <h1 
            className="text-2xl lg:text-5xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full p-4 lg:p-8 text-center pointer-events-none shadow-2xl whitespace-nowrap"
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
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(0)}`}
              alt={getImageByIndex(0)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(1)}`}
              alt={getImageByIndex(1)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(2)}`}
              alt={getImageByIndex(2)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(3)}`}
              alt={getImageByIndex(3)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(4)}`}
              alt={getImageByIndex(4)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(5)}`}
              alt={getImageByIndex(5)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(6)}`}
              alt={getImageByIndex(6)}
              className="object-cover w-full h-full rounded"
            />
      </div>
    </div>

        {/* Second Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(7)}`}
              alt={getImageByIndex(7)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(8)}`}
              alt={getImageByIndex(8)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(9)}`}
              alt={getImageByIndex(9)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(10)}`}
              alt={getImageByIndex(10)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(11)}`}
              alt={getImageByIndex(11)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(12)}`}
              alt={getImageByIndex(12)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(13)}`}
              alt={getImageByIndex(13)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Third Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(14)}`}
              alt={getImageByIndex(14)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(15)}`}
              alt={getImageByIndex(15)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(16)}`}
              alt={getImageByIndex(16)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(17)}`}
              alt={getImageByIndex(17)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(18)}`}
              alt={getImageByIndex(18)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(19)}`}
              alt={getImageByIndex(19)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(20)}`}
              alt={getImageByIndex(20)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Duplicate grids for seamless loop */}
        {/* First Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(21)}`}
              alt={getImageByIndex(21)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(22)}`}
              alt={getImageByIndex(22)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(23)}`}
              alt={getImageByIndex(23)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(24)}`}
              alt={getImageByIndex(24)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(25)}`}
              alt={getImageByIndex(25)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(26)}`}
              alt={getImageByIndex(26)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(0)}`}
              alt={getImageByIndex(0)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Second Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(1)}`}
              alt={getImageByIndex(1)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(2)}`}
              alt={getImageByIndex(2)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(3)}`}
              alt={getImageByIndex(3)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(4)}`}
              alt={getImageByIndex(4)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(5)}`}
              alt={getImageByIndex(5)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(6)}`}
              alt={getImageByIndex(6)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(7)}`}
              alt={getImageByIndex(7)}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Third Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(8)}`}
              alt={getImageByIndex(8)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(9)}`}
              alt={getImageByIndex(9)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(10)}`}
              alt={getImageByIndex(10)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/bugs/only/${getImageByIndex(11)}`}
              alt={getImageByIndex(11)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(12)}`}
              alt={getImageByIndex(12)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(13)}`}
              alt={getImageByIndex(13)}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/bugs/only/${getImageByIndex(14)}`}
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