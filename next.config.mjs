/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  ...(process.env.STATIC_EXPORT === "true" ? {
    output: "export",
    trailingSlash: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    images: { unoptimized: true }
  } : {})
};
export default nextConfig;
