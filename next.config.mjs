// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cohpfgoclivhmbcslzyk.supabase.co'],
  },eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint errors will be ignored during build
  },
};

export default nextConfig;
