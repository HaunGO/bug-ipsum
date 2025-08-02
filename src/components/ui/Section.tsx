interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <section title={title} className="content-section">      
      <div>
        {children}
      </div>
    </section>
  );
} 