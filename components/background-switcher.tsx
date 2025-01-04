'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { backgrounds } from '@/lib/backgrounds';
import { SnowEffect } from './snow-effect';
import { SpaceEffect } from './space-effect';

interface BackgroundSwitcherProps {
  children: React.ReactNode;
}

export function BackgroundSwitcher({ children }: BackgroundSwitcherProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentBackground = backgrounds[bgIndex];
  const showSnowEffect = currentBackground.includes('wallhaven-vgv2zm') || 
                        currentBackground.includes('sw2zerxbdp261');
  const showSpaceEffect = currentBackground.includes('Wallpaper-2020');

  const changeBackground = (newIndex: number) => {
    setIsLoading(true);
    const img = new Image();
    img.src = backgrounds[newIndex];
    img.onload = () => {
      setBgIndex(newIndex);
      setIsLoading(false);
    };
  };

  const nextBackground = () => {
    const newIndex = (bgIndex + 1) % backgrounds.length;
    changeBackground(newIndex);
  };

  const prevBackground = () => {
    const newIndex = (bgIndex - 1 + backgrounds.length) % backgrounds.length;
    changeBackground(newIndex);
  };

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: isLoading ? 'none' : 'filter 0.3s ease-out',
        filter: isLoading ? 'brightness(0.5)' : 'brightness(1)',
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      {showSnowEffect && <SnowEffect />}
      {showSpaceEffect && <SpaceEffect />}
      
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white disabled:opacity-50"
          onClick={prevBackground}
          disabled={isLoading}
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>
        
        {children}

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white disabled:opacity-50"
          onClick={nextBackground}
          disabled={isLoading}
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>
      </div>
    </main>
  );
}