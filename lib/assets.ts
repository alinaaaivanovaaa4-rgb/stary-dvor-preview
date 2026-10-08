/** Public files need the same prefix as Next.js when hosted in a subdirectory. */
export function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
