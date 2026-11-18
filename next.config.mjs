/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes a ready-to-upload website into ./build
  output: "export",
  distDir: "build",
  // Emit /about/index.html instead of /about.html so plain web servers (Apache, Nginx, cPanel) serve clean URLs
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
