'use client';

import { useState, useEffect, useRef } from 'react';
import { sounds, type SoundType } from '@/lib/sounds';

export function useSound() {
  const [currentSound, setCurrentSound] = useState<SoundType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentSound) {
      setIsLoading(true);
      setError(null);

      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(sounds[currentSound]);
      audio.loop = true;

      const handleCanPlay = () => {
        setIsLoading(false);
        audio.play().catch((err) => {
          setError('Failed to play audio');
          setCurrentSound(null);
        });
      };

      const handleError = () => {
        setError('Failed to load audio');
        setIsLoading(false);
        setCurrentSound(null);
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);

      audioRef.current = audio;

      // Cleanup function
      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        audio.pause();
      };
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsLoading(false);
      setError(null);
    }
  }, [currentSound]);

  const playSound = (sound: SoundType) => {
    if (currentSound === sound) {
      setCurrentSound(null);
    } else {
      setCurrentSound(sound);
    }
  };

  return {
    currentSound,
    playSound,
    isLoading,
    error
  };
}