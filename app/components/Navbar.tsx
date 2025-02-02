"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { User } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

export function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-12">
              <Image
                src="/logo.svg"
                alt="WEHIndia Logo"
                width={48}
                height={48}
                priority
              />
            </div>
            <span className="text-xl font-semibold">WEHIndia</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Services
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact us
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          
          <Button asChild>
            <Link href="/signup">
              Get started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}