'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

interface BugBuilderProps {
  className?: string;
}

export function BugBuilder({ className = '' }: BugBuilderProps) {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [saturation, setSaturation] = useState('');
  const [blur, setBlur] = useState('');
  const [contrast, setContrast] = useState('');
  const [tint, setTint] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const generatedUrl = useMemo(() => {
    // Use a fallback for server-side rendering
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    let url = `${baseUrl}/api/${width}/${height}`;
    
    const params = new URLSearchParams();
    if (saturation) params.append('saturation', saturation);
    if (blur) params.append('blur', blur);
    if (contrast) params.append('contrast', contrast);
    if (tint) params.append('tint', tint);
    if (selectedImage) params.append('image', selectedImage);
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    return url;
  }, [width, height, saturation, blur, contrast, tint, selectedImage]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      // You could add a toast notification here later
      console.log('URL copied to clipboard:', generatedUrl);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className={`bug-builder ${className}`}>
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Bug Image URL Builder
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Width
              </label>
              <input
                type="number"
                id="width"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min="1"
                max="2000"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Height
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min="1"
                max="2000"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="saturation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Saturation
              </label>
              <select
                id="saturation"
                value={saturation}
                onChange={(e) => setSaturation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Default</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="blur" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Blur
              </label>
              <select
                id="blur"
                value={blur}
                onChange={(e) => setBlur(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Default</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="contrast" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contrast
              </label>
              <select
                id="contrast"
                value={contrast}
                onChange={(e) => setContrast(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Default</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="tint" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tint Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="tint"
                value={tint}
                onChange={(e) => setTint(e.target.value)}
                className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={tint}
                onChange={(e) => setTint(e.target.value)}
                placeholder="#000000"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
              />
              {tint && (
                <button
                  onClick={() => setTint('')}
                  className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Select a color to apply as a tint overlay to the image
            </div>
          </div>
          
          <div>
            <label htmlFor="imageSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bug Image
            </label>
            <div className="relative">
              <select
                id="imageSelect"
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Random Bug Image</option>
                <option value="0">0 - Big Brown Moth</option>
                <option value="1">1 - Blue-eyed Dragonfly</option>
                <option value="2">2 - Butterfly in Hand</option>
                <option value="3">3 - Cotton Candy Moth</option>
                <option value="4">4 - First Cicada of the Year</option>
                <option value="5">5 - Grandfather Moth</option>
                <option value="6">6 - Ladybug on Thumb 1</option>
                <option value="7">7 - Ladybug on Thumb 2</option>
                <option value="8">8 - Red-eyed Cicada</option>
                <option value="9">9 - White Collar Country Boy</option>
                <option value="10">10 - Beetle on a Leaf</option>
                <option value="11">11 - Beetles Under Tree Bark 1</option>
                <option value="12">12 - Beetles Under Tree Bark 2</option>
                <option value="13">13 - Big Brown Moth 2</option>
                <option value="14">14 - Big Fly</option>
                <option value="15">15 - Big Harry Tarantula</option>
                <option value="16">16 - Black Widow Underbelly</option>
                <option value="17">17 - Bug Juice</option>
                <option value="18">18 - Bug Silhouette on Screen</option>
                <option value="19">19 - Bumble Bee</option>
                <option value="20">20 - Cotton Candy Moth</option>
                <option value="21">21 - Easter Bugs 1</option>
                <option value="22">22 - Easter Bugs 2</option>
                <option value="23">23 - Easter Bugs 3</option>
                <option value="24">24 - Inch Worm Macro 1</option>
                <option value="25">25 - Inch Worm Macro 2</option>
                <option value="26">26 - Jumping Spider</option>
                <option value="27">27 - Ladybug Macro</option>
                <option value="28">28 - Ladybug Softy</option>
                <option value="29">29 - Leaf-footed Bug on Window 1</option>
                <option value="30">30 - Leaf-footed Bug on Window 2</option>
                <option value="31">31 - Little Green Leaf Bug</option>
                <option value="32">32 - Macro Fly</option>
                <option value="33">33 - Potato Beetle</option>
                <option value="34">34 - Rolley Polley</option>
                <option value="35">35 - Spider in White</option>
                <option value="36">36 - Under Ladybug Skirt</option>
                <option value="37">37 - Unknown Red Bug</option>
              </select>
            </div>
            
            {/* Image Thumbnails Grid */}
            {selectedImage && (
              <div className="mt-3">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Image Preview:
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <Image
                      src={`/api/50/50?image=${selectedImage}`}
                      alt={`Bug image ${selectedImage}`}
                      width={50}
                      height={50}
                      className="rounded-md border-2 border-blue-500 shadow-md"
                    />
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {selectedImage}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Choose a specific bug image or leave as random
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Generated URL
            </label>
            <div className="flex">
              <input
                type="text"
                value={generatedUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono"
              />
              <button
                onClick={handleCopyUrl}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Copy this URL and paste it in a new tab to generate your bug image
          </div>
        </div>
      </div>
    </div>
  );
}
