export function stringLength(str, limit) {
  if (typeof str !== 'string') {
    return null;
  }
  let text = str.trim().slice(0, limit);
  const lastSpace = str.lastIndexOf(' ');
  if (lastSpace > 0) {
    text = text.substring(0, lastSpace);
  }
  return `${text}...`;
}
