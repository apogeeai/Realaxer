'use client';

import { Button } from '@/components/ui/button';
import { Timer } from '@/components/timer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SoundMenu } from '@/components/sound-menu';
import { Palette, Waves, LogIn, Menu, Eye } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function Nav() {
  const { theme, setTheme } = useTheme();
  
  const NavItems = () => (
    <>
      <Timer />
      <SoundMenu />

      <Link href="/theme-generator">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </Link>

      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Button variant="outline" size="sm" className="hidden sm:inline-flex">
        <LogIn className="h-4 w-4 mr-2" />
        Login
      </Button>
    </>
  );
  
  return (
    <nav className="h-[58px] border-b fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="h-full mx-auto flex items-center justify-between px-4 sm:px-6 max-w-[1260px] min-w-[320px]">
        <Link href="/" className="flex items-center space-x-2">
          <Waves className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-semibold text-lg sm:text-xl">Relaxer</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
          <NavItems />
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <NavItems />
              <Button variant="outline" size="sm" className="sm:hidden w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}