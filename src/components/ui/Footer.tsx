interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function Footer({ className = '', children }: FooterProps) {
  return (
    <footer className={`site-footer ${className}`}>
      {children || <p><em>It&apos;s not a bug, it&apos;s a feature.</em></p>}
    </footer> 
  );
} 