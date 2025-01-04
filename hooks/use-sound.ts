'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { sounds, type SoundId } from '@/lib/sounds';
import { toast } from 'sonner';

interface AudioCache {
  audio: HTMLAudioElement;
  loading: boolean;
  error: string | null;
}

const audioCache = new Map<string, AudioCache>();

export function useSound() {
  const [currentSound, setCurrentSound] = useState<SoundId | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio files
  useEffect(() => {
    Object.entries(sounds).forEach(([id, sound]) => {
      if (!audioCache.has(id)) {
        const audio = new Audio(sound.url);
        audio.preload = 'auto';
        audio.volume = sound.volume;
        audio.loop = sound.loop;

        audioCache.set(id, {
          audio,
          loading: true,
          error: null
        });

        const handleCanPlayThrough = () => {
          const cache = audioCache.get(id);
          if (cache) {
            audioCache.set(id, { ...cache, loading: false });
          }
        };

        const handleError = () => {
          const cache = audioCache.get(id);
          if (cache) {
            audioCache.set(id, {
              ...cache,
              loading: false,
              error: `Failed to load ${sound.name}`
            });
          }
        };

        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('error', handleError);

        return () => {
          audio.removeEventListener('canplaythrough', handleCanPlayThrough);
          audio.removeEventListener('error', handleError);
        };
      }
    });
  }, []);

  const stopCurrentSound = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    setCurrentSound(null);
    setIsLoading(false);
    setError(null);
  }, []);

  const playSound = useCallback((soundId: SoundId) => {
    // If the same sound is playing, stop it
    if (currentSound === soundId) {
      stopCurrentSound();
      return;
    }

    // Stop current sound if any
    stopCurrentSound();

    const cache = audioCache.get(soundId);
    if (!cache) {
      setError(`Sound ${soundId} not found`);
      toast.error('Sound Error', {
        description: `Sound ${soundId} not found`
      });
      return;
    }

    if (cache.error) {
      setError(cache.error);
      toast.error('Sound Error', {
        description: cache.error
      });
      return;
    }

    setIsLoading(cache.loading);
    setCurrentSound(soundId);

    const audio = cache.audio;
    currentAudioRef.current = audio;

    // Reset audio to beginning if it was played before
    audio.currentTime = 0;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Playback failed:', error);
        setError('Failed to play sound');
        setCurrentSound(null);
        toast.error('Sound Error', {
          description: 'Failed to play sound'
        });
      });
    }
  }, [currentSound, stopCurrentSound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCurrentSound();
    };
  }, [stopCurrentSound]);

  return {
    currentSound,
    playSound,
    stopSound: stopCurrentSound,
    isLoading,
    error
  };
}