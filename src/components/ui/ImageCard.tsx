interface ImageCardProps {
  title: string;
  code: string;
  imageUrl: string;
  alt: string;
}

export function ImageCard({ title, code, imageUrl, alt }: ImageCardProps) {
  return (
    <div className="image-card">
      <h3 className="image-card-title">{title}</h3>
      <div className="image-card-code">
        {code}
      </div>
      <img 
        src={imageUrl} 
        alt={alt} 
        className="image-card-image"
      />
    </div>
  );
} 