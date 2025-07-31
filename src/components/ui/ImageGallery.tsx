import Image from 'next/image';

interface ImageGalleryProps {
  title?: string;
}

export function ImageGallery({ title = "SOURCE IMAGES" }: ImageGalleryProps) {
  const imageFiles = ['1.jpg', '2.jpg', '3.jpg'];
  
  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      )}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
          {imageFiles.map((filename, index) => (
            <div 
              key={filename}
              className="flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <Image
                src={`/images/${filename}`}
                alt={`Source image ${index + 1}`}
                width={400}
                height={300}
                className="object-cover"
                style={{ height: '300px', width: 'auto' }}
              />
              <div className="p-3 bg-white">
                <p className="text-sm font-mono text-gray-600">{filename}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 