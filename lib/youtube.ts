/**
 * Convierte una URL de YouTube (cualquier formato) al embed:
 * https://www.youtube.com/embed/VIDEO_ID
 * Devuelve null si la URL no es reconocible.
 *
 * Función pura: se puede importar tanto desde server como client.
 */
export function youTubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  const corto = u.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (corto) return `https://www.youtube.com/embed/${corto[1]}`;
  const watch = u.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  const embed = u.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embed) return `https://www.youtube.com/embed/${embed[1]}`;
  const shorts = u.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/);
  if (shorts) return `https://www.youtube.com/embed/${shorts[1]}`;
  return null;
}
