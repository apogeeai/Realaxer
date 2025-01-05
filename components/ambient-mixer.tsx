"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const AMBIENT_PRESETS = [
  {
    id: "forest-rain",
    name: "Forest Rain",
    description: "Gentle rain with distant thunder and birds",
    tracks: ["rain", "thunder", "birds"],
  },
  {
    id: "night-crickets",
    name: "Night Crickets",
    description: "Peaceful cricket sounds with light wind",
    tracks: ["crickets", "wind"],
  },
  {
    id: "campfire",
    name: "Campfire",
    description: "Crackling fire with night ambience",
    tracks: ["fire", "crickets"],
  },
  {
    id: "storm",
    name: "Storm",
    description: "Heavy rain with thunder and strong wind",
    tracks: ["rain", "thunder", "wind"],
  },
  {
    id: "forest-morning",
    name: "Forest Morning",
    description: "Bird songs with gentle wind",
    tracks: ["birds", "wind"],
  },
];

export function AmbientMixer() {
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const togglePreset = (presetId: string) => {
    setActivePreset(activePreset === presetId ? null : presetId);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {AMBIENT_PRESETS.map(preset => (
        <div
          key={preset.id}
          className="relative bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors group"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-white">{preset.name}</h3>
              <p className="text-sm text-white/60">{preset.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-white hover:bg-white/20"
              onClick={() => togglePreset(preset.id)}
            >
              {activePreset === preset.id ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {preset.tracks.map(track => (
              <span
                key={track}
                className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
              >
                {track}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 