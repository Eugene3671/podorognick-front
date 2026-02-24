import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ftp.goit.study" }],
    domains: ["res.cloudinary.com", "ac.goit.global"],
  },
  reactCompiler: true,
};

export default nextConfig;
