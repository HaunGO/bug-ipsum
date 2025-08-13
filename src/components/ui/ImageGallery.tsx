'use client';

import { ImageCard } from './ImageCard';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface ImageGalleryProps {
  title?: string;
}

export function ImageGallery({ title = "" }: ImageGalleryProps) {
  const imageFiles = ['1.jpg', '2.jpg', '3.jpg'];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const content = contentRef.current;
    
    if (!scrollContainer || !content) return;

    // For seamless loop, we scroll exactly half the content width (since content is duplicated)
    const halfWidth = content.scrollWidth / 2;
    
    // Set initial position
    scrollContainer.scrollLeft = 0;
    
    // Create seamless infinite scroll
    const scrollTimeline = gsap.timeline({ repeat: -1 });
    
    scrollTimeline.to(scrollContainer, {
      scrollLeft: halfWidth,
      duration: 100, // Increase this number to slow it down (was 20)
      ease: "none",
      onComplete: () => {
        // Reset to start position for seamless loop
        scrollContainer.scrollLeft = 0;
      }
    });

    // Pause on hover, resume on leave
    const handleMouseEnter = () => scrollTimeline.pause();
    const handleMouseLeave = () => scrollTimeline.resume();
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      scrollTimeline.kill();
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
      </div>
    </div>

        {/* Second Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Third Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
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
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Second Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        {/* Third Bento Grid (Duplicate) */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-[80vw] lg:w-[900px] flex-none h-full">
          {/* Top left - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top center - square (1 col, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Top right - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Left middle - tall rectangle (1 col, 2 rows) */}
          <div className="col-span-1 row-span-2">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center middle - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[2]}`}
              alt={imageFiles[2]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Center bottom - wide rectangle (2 cols, 1 row) */}
          <div className="col-span-1 row-span-1">
            <img
              src={`/images/${imageFiles[0]}`}
              alt={imageFiles[0]}
              className="object-cover w-full h-full rounded"
            />
          </div>
          
          {/* Bottom right - square (1 col, 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={`/images/${imageFiles[1]}`}
              alt={imageFiles[1]}
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
} 