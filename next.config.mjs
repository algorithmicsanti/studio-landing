/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensure strict match for all internal links
    trailingSlash: false,
    // Use standalone output for efficient lambda bundling
    output: "standalone",
};

export default nextConfig;
