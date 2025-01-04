'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { sounds, type SoundId } from '@/lib/sounds';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function SoundMenu() {
  const { currentSound, playSound, stopSound, isLoading, error } = useSound();

  useEffect(() => {
    if (error) {
      toast.error('Sound Error', {
        description: error,
      });
    }
  }, [error]);

  // Group sounds by category
  const groupedSounds = Object.entries(sounds).reduce((acc, [id, sound]) => {
    if (!acc[sound.category]) {
      acc[sound.category] = [];
    }
    acc[sound.category].push({ id, ...sound });
    return acc;
  }, {} as Record<string, Array<{ id: string } & typeof sounds[keyof typeof sounds]>>);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : currentSound ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
          {currentSound && !isLoading && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {Object.entries(groupedSounds).map(([category, categorySounds]) => (
          <div key={category}>
            <DropdownMenuLabel className="capitalize">
              {category}
            </DropdownMenuLabel>
            {categorySounds.map(({ id, name }) => (
              <DropdownMenuItem
                key={id}
                onClick={() => playSound(id as SoundId)}
                className="flex items-center justify-between"
                disabled={isLoading}
              >
                {name}
                {currentSound === id && (
                  <span className="w-2 h-2 bg-primary rounded-full" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </div>
        ))}
        <DropdownMenuItem
          onClick={stopSound}
          className="text-destructive focus:text-destructive"
          disabled={!currentSound || isLoading}
        >
          Stop All Sounds
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}