'use client';

import { Nav } from '@/components/nav';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const generatePalette = () => {
  const hue = Math.floor(Math.random() * 360);
  return {
    primary: `hsl(${hue}, 70%, 50%)`,
    secondary: `hsl(${(hue + 30) % 360}, 60%, 60%)`,
    accent: `hsl(${(hue + 60) % 360}, 50%, 70%)`,
    background: `hsl(${(hue + 180) % 360}, 15%, 95%)`,
  };
};

export default function ThemeGenerator() {
  const [palette, setPalette] = useState(generatePalette());

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Nav />
      
      <div className="pt-[78px] container max-w-[1260px] mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Theme Generator</h1>
          
          <div className="grid gap-6">
            <div className="p-6 rounded-lg bg-white shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(palette).map(([name, color]) => (
                  <div key={name} className="space-y-2">
                    <div
                      className="w-full h-24 rounded-md"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-sm font-medium capitalize">{name}</p>
                    <p className="text-sm text-muted-foreground">{color}</p>
                  </div>
                ))}
              </div>
              
              <Button
                className="w-full"
                onClick={() => setPalette(generatePalette())}
              >
                Generate New Theme
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}