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
    <div className={`bug-builder ${className} flex flex-col items-center align-center justify-center gap-4 md:flex-row`}>

      <div className="md:w-1/2 max-w-4xla p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Bug Image URL Builder
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
        
        <div className="my-4">

        <div className="grid grid-cols-6 gap-4 mb-4">
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
                <option value="">None</option>
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
                <option value="">None</option>
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
                <option value="">None</option>
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
            <label htmlFor="tint" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tint
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="tint"
                value={tint}
                onChange={(e) => setTint(e.target.value)}
                className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
              />
              {/* <input
                type="text"
                value={tint}
                onChange={(e) => setTint(e.target.value)}
                placeholder="#000000"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
              /> */}
              {tint && (
                <button
                  onClick={() => setTint('')}
                  className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
          
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Bug Image Selection
            </label> */}
            
            {/* Random Image Option */}
            {/* <div className="mb-4">
              <button
                onClick={() => setSelectedImage('')}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedImage === '' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    🎲 Random Bug Image
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Get a surprise bug each time
                  </div>
                </div>
              </button>
            </div> */}
            
            {/* Image Grid */}
            <div className="my-4 grid grid-cols-10 gap-2 max-h-96 overflow-y-auto p-2 border border-gray-200 dark:border-gray-600 rounded-lg">
              {Array.from({ length: 38 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i.toString())}
                  className={`relative group transition-all duration-200 ${
                    selectedImage === i.toString()
                      ? 'ring-2 ring-blue-500 ring-offset-2'
                      : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-500'
                  }`}
                >
                  <Image
                    src={`/api/60/60?image=${i}`}
                    alt={`Bug image ${i}`}
                    width={60}
                    height={60}
                    className="w-full h-auto rounded-md object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-black/70 text-white text-xs px-1 py-0 font-mono">
                    {i}
                  </div>
                  <div className={`absolute inset-0 rounded-md transition-opacity duration-200 ${
                    selectedImage === i.toString()
                      ? 'bg-blue-500/20'
                      : 'group-hover:bg-black/10'
                  }`} />
                </button>
              ))}
            </div>
            
          </div>
          
          
        </div>
      </div>
    
      <div className='md:w-1/2'>
        <img src={generatedUrl} alt="Bug Image" />
      </div>

    </div>
  );
}
