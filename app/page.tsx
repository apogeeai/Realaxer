'use client';

import { useState } from 'react';
import { Nav } from '@/components/nav';
import { Game } from '@/components/game';
import { BackgroundSwitcher } from '@/components/background-switcher';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Nav onPlayModeChange={setIsPlaying} />
      <BackgroundSwitcher>
        <div className="w-full max-w-[1260px] mx-auto min-w-[320px] pt-[58px] px-4 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-3xl aspect-[4/3] relative">
            <Game isPlaying={isPlaying} />
          </div>
        </div>
      </BackgroundSwitcher>
    </>
  );
}