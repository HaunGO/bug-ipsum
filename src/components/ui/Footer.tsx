interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function Footer({ className = '', children }: FooterProps) {
  return (
    <footer className={`site-footer ${className}`}>
      {children || <p><em>It's not a bug, it's a feature.</em></p>}
    </footer> 
  );
} 