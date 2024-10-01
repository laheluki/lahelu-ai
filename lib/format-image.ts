export function formatImageSize(bytes: number) {
  const size = bytes / 1024 / 1024;

  if (size > 1) {
    return `${size.toFixed(1)} MB`;
  } else {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
}
