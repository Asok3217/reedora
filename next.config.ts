/** @type {import('next').NextConfig} */
const nextConfig = {
  
  eslint: {
    // ❗ Allows production builds to continue even if ESLint errors exist
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "static-01.daraz.com.np",
      "static-01.daraz.com.bd",
      "static3.webx.pk",
      "img.drz.lazcdn.com",
      "cdn.notinoimg.com",
      "fimgs.net",
      "imgs.search.brave.com",
      "img.freepik.com",
      "localhost",
      "images.unsplash.com",
      "plus.unsplash.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  },
};

export default nextConfig;
