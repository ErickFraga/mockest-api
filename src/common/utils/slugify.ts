export function slugify(text: string): string {
  const slugText = text
    .normalize('NFD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/_/g, '-')
    .replace(/--+/g, '-')
    .replace(/-$/g, '');
  return slugText;
}
