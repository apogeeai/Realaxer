export interface Sound {
  name: string;
  url: string;
  volume: number;
  loop: boolean;
  category: 'nature' | 'ambient' | 'noise';
}

export const sounds: Record<string, Sound> = {
  rain: {
    name: 'Rain',
    url: '/sounds/rain.mp3',
    volume: 0.4,
    loop: true,
    category: 'nature'
  },
  nature: {
    name: 'Nature Ambient',
    url: '/sounds/ambient-nature.mp3',
    volume: 0.4,
    loop: true,
    category: 'nature'
  },
  space: {
    name: 'Space Ambient',
    url: '/sounds/space-ambient.mp3',
    volume: 0.3,
    loop: true,
    category: 'ambient'
  }
} as const;

export type SoundId = keyof typeof sounds;