'use client';

import { Nav } from '@/components/nav';
import { Game } from '@/components/game';
import { BackgroundSwitcher } from '@/components/background-switcher';

export default function Home() {
  return (
    <>
      <Nav />
      <BackgroundSwitcher>
        <div className="w-full max-w-[1260px] mx-auto min-w-[320px] pt-[58px]">
          <div className="max-w-3xl mx-auto">
            <Game />
          </div>
        </div>
      </BackgroundSwitcher>
    </>
  );
}