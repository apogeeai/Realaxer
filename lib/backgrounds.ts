export const backgrounds = [
  'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe', // Tropical waterfall
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d', // Underwater coral reef
  'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22', // Snowy mountain forest
  'https://images.unsplash.com/photo-1448375240586-882707db888b', // Misty rainforest
  'https://images.unsplash.com/photo-1511497584788-876760111969', // Crystal clear waterfall
] as const;

export type BackgroundType = (typeof backgrounds)[number];