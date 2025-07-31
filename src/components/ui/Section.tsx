interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className = "" }: SectionProps) {
  // const isScroller = className.includes('sectionScroller');
  return (
    <section className="content-section">
      <h2 className="section-title">{title}</h2>
      {/* {isScroller ? ( */}
        <div className={`sectionScroller`}>
          {children}
        </div>
      {/* ) : children} */}
    </section>
  );
} 