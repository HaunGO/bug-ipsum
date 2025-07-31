import Image from 'next/image';

interface ImageGalleryProps {
  title?: string;
}

export function ImageGallery({ title = "SOURCE IMAGES" }: ImageGalleryProps) {
  const imageFiles = ['1.jpg', '2.jpg', '3.jpg'];
  
  return (
    <div className="gallery-container">
      {title && (
        <h3 className="gallery-title">{title}</h3>
      )}
      <div className="gallery-scroll">
        <div className="gallery-grid" style={{ minWidth: 'max-content' }}>
          {imageFiles.map((filename, index) => (
            <div 
              key={filename}
              className="gallery-item"
            >
              <Image
                src={`/images/${filename}`}
                alt={`Source image ${index + 1}`}
                width={400}
                height={300}
                className="gallery-image"
              />
              <div className="gallery-caption">
                <p className="gallery-filename">{filename}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 