import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export function Navigation() {
  return (
    <nav aria-label="Main" className="sticky top-0 z-50 border-b border-line bg-page">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* Both logos render; CSS picks one so there's no theme flash or hydration swap. */}
          <Image src="/images/logo-black.png" alt="Bug Ipsum home" width={96} height={44} className="h-9 w-auto dark:hidden" priority />
          <Image src="/images/logo-white.png" alt="Bug Ipsum home" width={96} height={44} className="hidden h-9 w-auto dark:block" priority />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
