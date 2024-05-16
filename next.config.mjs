/** @type {import('next').NextConfig} */

const nextConfig = {
    // フロントエンドからのAPIリクエストをバックエンドサーバーに透過的に転送するための設定。
    // この設定は開発効率の向上や、開発環境の構築を容易にするために役立つ。
    // ただし、本番環境での使用にはセキュリティやパフォーマンスの観点からプロキシサーバーなどの適切な手段を検討する必要がある。
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: process.env.BACKEND_URL + '/api/:path*/',
        },
      ]
    },
    images: {
      domains: ['vercel-netrennen.s3.eu-central-1.amazonaws.com'],
    },
  };

export default nextConfig;