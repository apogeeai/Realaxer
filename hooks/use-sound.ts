'use client';

import { useState, useEffect, useCallback } from 'react';
import { sounds, type SoundId } from '@/lib/sounds';
import { getAudioGenerator } from '@/lib/audio-generator';
import { toast } from 'sonner';

export function useSound() {
  const [currentSound, setCurrentSound] = useState<SoundId | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopCurrentSound = useCallback(() => {
    const generator = getAudioGenerator();
    generator.stop();
    setCurrentSound(null);
    setIsLoading(false);
    setError(null);
  }, []);

  const playSound = useCallback((soundId: SoundId) => {
    try {
      // If the same sound is playing, stop it
      if (currentSound === soundId) {
        stopCurrentSound();
        return;
      }

      // Stop current sound if any
      stopCurrentSound();

      const sound = sounds[soundId];
      const generator = getAudioGenerator();

      setIsLoading(true);
      setCurrentSound(soundId);

      // Generate the appropriate sound
      switch (sound.generator) {
        case 'rain':
          generator.generateRain(sound.volume);
          break;
        case 'space':
          generator.generateSpaceAmbient(sound.volume);
          break;
        case 'nature':
          generator.generateNatureAmbient(sound.volume);
          break;
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Sound generation failed:', err);
      setError('Failed to generate sound');
      setCurrentSound(null);
      toast.error('Sound Error', {
        description: 'Failed to generate sound'
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