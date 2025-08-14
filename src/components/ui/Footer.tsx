interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function Footer({ className = '', children }: FooterProps) {
  return (
    <footer className={`site-footer ${className}`}>
      {children || <p><em>Every bug is a feature waiting to be discovered.</em></p>}
    </footer>
  );
} 