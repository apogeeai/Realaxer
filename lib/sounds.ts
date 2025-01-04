export const sounds = {
  'Rain': 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
  'Ocean Waves': 'https://assets.mixkit.co/active_storage/sfx/2439/2439-preview.mp3',
  'White Noise': 'https://assets.mixkit.co/active_storage/sfx/2437/2437-preview.mp3',
  'Stream': 'https://assets.mixkit.co/active_storage/sfx/2442/2442-preview.mp3',
  'Waterfall': 'https://assets.mixkit.co/active_storage/sfx/2443/2443-preview.mp3'
} as const;

export type SoundType = keyof typeof sounds;