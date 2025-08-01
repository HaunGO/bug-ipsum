interface CardBoxProps {
  children: React.ReactNode;
  variant?: 'scroll' | 'fit' | 'none' | 'wrap';
  className?: string;
}

export function CardBox({ children, variant='scroll', className='' }: CardBoxProps) {
      const styles = {
      none:   "",
      scroll: "w-full overflow-x-auto",
      fit:    "w-full overflow-x-auto",
      wrap:   "w-full"
    };
    
    const containerStyles = {
      none:   "",
      scroll: "flex flex-row flex-nowrap gap-6 pb-4 [&>*]:flex-none",
      fit:    "flex flex-row flex-nowrap gap-2 md:gap-4 lg:gap-6 pb-4",
      wrap:   "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 auto-rows-max [&>img]:w-full"
    };

  return (
    <div className={`${styles[variant]} ${className}`}>
      <div className={containerStyles[variant]}>
        {children}
      </div>
    </div>
  )
}
