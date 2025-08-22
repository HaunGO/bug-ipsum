interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`content-section ${className}`}>      
      {/* <h2 className="section-title">{title}</h2> */}
      <div>
        {children}
      </div>
    </section>
  );
} 