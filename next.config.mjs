/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "ycf8j638kipimy6p.public.blob.vercel-storage.com"
            }
        ]
    }
};

export default nextConfig;
