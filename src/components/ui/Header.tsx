interface HeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function Header({ title, subtitle, className = '' }: HeaderProps) {
  return (
    <header className={`page-header ${className}`}>
      <div className="page-header__container">
        <h1>{title}</h1>
        <p className="lead">{subtitle}</p>
      </div>
    </header>
  );
} 