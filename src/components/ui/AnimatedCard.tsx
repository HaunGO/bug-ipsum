'use client';

import { useEffect, useRef } from 'react';
import { gsap, fadeInUp, scaleIn } from '../../lib/gsap';

interface AnimatedCardProps {
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ title, description, delay = 0, className = '' }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { ...fadeInUp, delay },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out",
          delay 
        }
      );
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-lg 
        p-6 
        transform transition-all duration-300 
        hover:scale-105 hover:shadow-xl
        cursor-pointer
        ${className}
      `}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
      }}
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
} 