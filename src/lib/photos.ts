import type { ImageMetadata } from 'astro';
import { photos, type PhotoKey } from '../config/site';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/fotos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

const showPlaceholders = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_PHOTO_PLACEHOLDERS === 'true';

export function getPhoto(key: PhotoKey): ImageMetadata | undefined {
  const file = photos[key].file as string;
  if (!file) return undefined;
  const match = Object.entries(files).find(([path]) => path.endsWith(`/${file}`));
  if (!match) console.warn(`[fotos] "${file}" (${key}) não encontrado em src/assets/fotos/.`);
  return match?.[1].default;
}

/** 'image' = foto real; 'placeholder' = marcador (dev/prévia); 'none' = omitir. */
export function photoState(key: PhotoKey): 'image' | 'placeholder' | 'none' {
  if (getPhoto(key)) return 'image';
  return showPlaceholders ? 'placeholder' : 'none';
}
