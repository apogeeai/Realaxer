export const backgrounds = [
  '/wallhaven-vgv2zm.jpg',
  '/sw2zerxbdp261.jpg',
  '/wallhaven-8oxpwj.jpg',
  '/wallhaven-q6q2yq.jpg',
  '/izsvveeepp461.jpg',
  '/Wallpaper-2020.png',
] as const;

export type BackgroundType = (typeof backgrounds)[number];