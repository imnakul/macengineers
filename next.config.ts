import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The image loader runs in the browser too, so the server-only CLOUDINARY_CLOUD_NAME is exposed
  // under a public name at build time (a cloud name is not a secret; it is in every image URL).
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
