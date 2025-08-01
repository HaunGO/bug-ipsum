import { CardBox } from './CardBox';
import { ImageCard } from './ImageCard';

interface ImageGalleryProps {
  title?: string;
}

export function ImageGallery({ title = "" }: ImageGalleryProps) {
  const imageFiles = ['1.jpg', '2.jpg', '3.jpg'];
  
  return (
    <CardBox variant="fit">
      {imageFiles.map((filename, index) => (
        <ImageCard
          key={filename}
          title={filename}
          caption={filename}
          src={`/images/${filename}`}
        />
      ))}
    </CardBox>
  );
} 