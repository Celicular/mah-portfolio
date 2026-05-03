/**
 * Converts a Google Drive viewer URL to a direct-embed image URL.
 * Works on both /file/d/ID/view and already-converted uc?export=view links.
 *
 * @param {string} url - raw image URL (local path, any URL, or Drive link)
 * @returns {string} - usable image src
 */
export function parseImageUrl(url) {
  if (!url) return url;

  // Already a direct Drive embed — leave it alone
  if (url.includes("drive.google.com/uc?export=view")) {
    return url;
  }

  // Viewer link: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)\//);
  if (match) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // Local path or external URL — return as-is
  return url;
}

/**
 * Returns true if the URL is a Google Drive viewer link that needs converting.
 */
export function isRawDriveUrl(url) {
  return !!(url && url.includes("drive.google.com/file/d/"));
}

/**
 * Returns true if the URL is any Google Drive link (raw or already converted).
 */
export function isDriveUrl(url) {
  return !!(url && url.includes("drive.google.com"));
}
