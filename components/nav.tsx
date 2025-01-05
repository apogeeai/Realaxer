'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, Volume2, Timer, Palette, LogIn, Waves } from 'lucide-react';
import Link from 'next/link';
import { SoundModal } from '@/components/sound-modal';

export function Nav({ onPlayModeChange }: { onPlayModeChange: (isPlaying: boolean) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isSoundModalOpen, setIsSoundModalOpen] = useState(false);
  
  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const toggleTimer = () => {
    if (!isTimerActive) {
      setTime(0);
    }
    setIsTimerActive(!isTimerActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayMode = () => {
    const newPlayMode = !isPlaying;
    setIsPlaying(newPlayMode);
    onPlayModeChange(newPlayMode);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-[1260px] mx-auto px-4 h-[58px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-white" />
            <span className="text-white font-medium">Realaxer</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-white"
              onClick={toggleTimer}
            >
              <div className="relative">
                <Timer className="h-5 w-5" />
                {isTimerActive && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono">
                    {formatTime(time)}
                  </div>
                )}
              </div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-white"
              onClick={togglePlayMode}
            >
              <Gamepad2 className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-white"
              onClick={() => setIsSoundModalOpen(true)}
            >
              <Volume2 className="h-5 w-5" />
            </Button>

            <Link href="/theme-generator">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-white"
              >
                <Palette className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex text-white bg-transparent border-white/20 hover:bg-white/20 hover:text-white transition-colors"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </nav>

      <SoundModal 
        isOpen={isSoundModalOpen}
        onClose={() => setIsSoundModalOpen(false)}
      />
    </>
  );
}