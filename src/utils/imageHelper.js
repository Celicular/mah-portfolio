/**
 * Resolves project/portfolio image URLs according to API specifications:
 * 1. Converts Google Drive sharing links (https://drive.google.com/file/d/<id>/...) to direct viewable URLs (https://drive.google.com/uc?export=view&id=<id>)
 * 2. Passes absolute external URLs (Cloudinary, CDNs, https://...) directly as-is
 * 3. Resolves relative paths like "/portfolio/3.png" or "/project/1.png" against https://celi.me
 * 4. Falls back gracefully if undefined or empty
 */
export function resolveImageUrl(image, fallback = '') {
  if (!image || typeof image !== 'string') return fallback;
  const trimmed = image.trim();
  if (!trimmed) return fallback;

  // 1. Check for Google Drive sharing links
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]+)/;
  const driveMatch = trimmed.match(driveRegex);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }

  // 2. Absolute URLs (Cloudinary, external HTTP/HTTPS)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // 3. Relative API paths (e.g., /portfolio/*.png or /project/*.png)
  if (trimmed.startsWith('/portfolio/') || trimmed.startsWith('/project/')) {
    return `https://celi.me${trimmed}`;
  }

  // If already a local absolute asset path starting with /assets
  if (trimmed.startsWith('/')) {
    return `https://celi.me${trimmed}`;
  }

  return trimmed;
}

/**
 * Filters visible items (hidden: false) and sorts them ascending by order
 */
export function processApiItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item && item.hidden !== true)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
}
