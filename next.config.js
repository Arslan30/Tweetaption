/** @type {import('next').NextConfig} */
const { version } = require("./package.json");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["@remotion/bundler", "@remotion/renderer"],
  },
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    // Workaround for the following issue:
    // https://github.com/aws-amplify/amplify-js/issues/11030#issuecomment-1598207365

    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === "nodejs") {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ }),
        new webpack.IgnorePlugin({
          resourceRegExp: /^@aws-sdk\/signature-v4-crt$/,
        })
      );

      config.externals.push({
        bufferutil: "commonjs bufferutil",
        "utf-8-validate": "commonjs utf-8-validate",
      });
    }
    return config;
  },
  env: {
    version,
  },
};

module.exports = nextConfig;
