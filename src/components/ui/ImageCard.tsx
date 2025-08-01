import Image from 'next/image';

interface ImageCardProps {
  width?: number;
  height?: number;
  caption: string;
  title: string;
  src: string;
}

export function ImageCard({ 
  width = 300, 
  height = 200, 
  caption, 
  title, 
  src 
}: ImageCardProps) {
  return (
    <figure className="flex flex-col" >
      <Image 
        src={src} 
        alt={caption}
        width={width}
        height={height}
        className="object-cover"
        priority
      />
      <figcaption className="mt-2 text-sm">
        <div className="font-semibold">{title}</div>
        <div className="text-gray-600 dark:text-gray-400 break-words">{caption}</div>
      </figcaption>
    </figure>
  );
} 