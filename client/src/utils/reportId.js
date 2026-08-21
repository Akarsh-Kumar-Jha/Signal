export function generateReportId(query) {
  if (!query || typeof query !== 'string') {
    query = 'signal-analysis';
  }

  // Create clean slug without awkward mid-word truncation
  const slug = query
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);

  // Generate 6-char random hash
  const hash = Math.random().toString(36).substring(2, 8);

  return `${slug || 'report'}-${hash}`;
}
