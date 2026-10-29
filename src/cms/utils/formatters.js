/**
 * Formatting and normalization utilities for academic content
 */

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}

export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function normalizeDoi(doi) {
  if (!doi) return '';
  let clean = doi.trim();
  // If it's already a full URL, extract the DOI part
  if (clean.startsWith('https://doi.org/')) {
    clean = clean.replace('https://doi.org/', '');
  } else if (clean.startsWith('http://doi.org/')) {
    clean = clean.replace('http://doi.org/', '');
  } else if (clean.startsWith('doi:')) {
    clean = clean.replace(/^doi:/i, '');
  }
  return clean.trim();
}

export function constructDoiUrl(doi) {
  const cleanDoi = normalizeDoi(doi);
  if (!cleanDoi) return '';
  return `https://doi.org/${cleanDoi}`;
}

