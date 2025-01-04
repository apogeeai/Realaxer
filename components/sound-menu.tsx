'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { sounds, type SoundType } from '@/lib/sounds';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function SoundMenu() {
  const { currentSound, playSound, isLoading, error } = useSound();

  useEffect(() => {
    if (error) {
      toast.error('Sound Error', {
        description: error,
      });
    }
  }, [error]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : currentSound ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {(Object.keys(sounds) as SoundType[]).map((sound) => (
          <DropdownMenuItem
            key={sound}
            onClick={() => playSound(sound)}
            className="flex items-center justify-between"
            disabled={isLoading}
          >
            {sound}
            {currentSound === sound && (
              <span className="w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}