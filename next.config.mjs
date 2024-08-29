/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './build',
  transpilePackages: ['rc-util', 'rc-pagination', 'rc-picker', '@ant-design'],
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
