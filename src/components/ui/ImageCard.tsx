interface ImageCardProps {
  title: string;
  code: string;
  imageUrl: string;
  alt: string;
}

export function ImageCard({ title, code, imageUrl, alt }: ImageCardProps) {
  return (
    <div className="">
      <h3 className="text-base font-semibold mb-3 text-gray-800">{title}</h3>
      <div className="bg-gray-50 border border-gray-200 p-3 rounded font-mono text-sm text-gray-700 mb-3 overflow-x-auto">
        {code}
      </div>
      <img 
        src={imageUrl} 
        alt={alt} 
        className=""
      />
    </div>
  );
} 