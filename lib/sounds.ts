export interface Sound {
  name: string;
  generator: 'rain' | 'space';
  volume: number;
  category: 'nature' | 'ambient';
}

export const sounds: Record<string, Sound> = {
  rain: {
    name: 'Rain',
    generator: 'rain',
    volume: 0.4,
    category: 'nature'
  },
  space: {
    name: 'Space Ambient',
    generator: 'space',
    volume: 0.3,
    category: 'ambient'
  }
} as const;

export type SoundId = keyof typeof sounds;