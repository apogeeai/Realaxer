"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const SOUND_TRACKS = [
  { id: "rain", name: "Rain", defaultVolume: 50 },
  { id: "thunder", name: "Thunder", defaultVolume: 30 },
  { id: "wind", name: "Wind", defaultVolume: 40 },
  { id: "birds", name: "Birds", defaultVolume: 60 },
  { id: "crickets", name: "Crickets", defaultVolume: 45 },
  { id: "fire", name: "Fire", defaultVolume: 50 },
];

export function MixerBoard() {
  const [tracks, setTracks] = useState(
    SOUND_TRACKS.map(track => ({
      ...track,
      volume: track.defaultVolume,
      muted: false
    }))
  );

  const handleVolumeChange = (trackId: string, value: number[]) => {
    setTracks(prev =>
      prev.map(track =>
        track.id === trackId ? { ...track, volume: value[0] } : track
      )
    );
  };

  const toggleMute = (trackId: string) => {
    setTracks(prev =>
      prev.map(track =>
        track.id === trackId ? { ...track, muted: !track.muted } : track
      )
    );
  };

  return (
    <div className="grid gap-6">
      {tracks.map(track => (
        <div key={track.id} className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 shrink-0 text-white hover:bg-white/20"
            onClick={() => toggleMute(track.id)}
          >
            {track.muted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-white/80">{track.name}</span>
              <span className="text-sm text-white/60">{track.volume}%</span>
            </div>
            <Slider
              value={[track.muted ? 0 : track.volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => handleVolumeChange(track.id, value)}
              className="cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
} 