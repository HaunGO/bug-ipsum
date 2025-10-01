interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}

export function Footer({ className = '', children }: FooterProps) {
  return (
    <footer className={`site-footer ${className}`} >

      <div>
        {children}
      </div>



      <p className="m-0">It's not a bug... &nbsp; It's a feature. &nbsp; &nbsp;</p>

    </footer> 
  );
} 