const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
//import { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } from '@craco/craco';
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  webpack: {
    plugins: {
      add: [
        // 只有在 ANALYZE=true 时添加 BundleAnalyzerPlugin
        ...(process.env.ANALYZE === 'true'
          ? [
              new BundleAnalyzerPlugin({
                analyzerMode: 'static', // 生成静态 HTML 文件
                reportFilename: 'bundle-report.html', // 输出文件名
                openAnalyzer: true, // 自动打开浏览器
                generateStatsFile: true, // 生成 stats.json
                statsFilename: 'stats.json',
                defaultSizes: 'gzip', // 显示 gzip 后的大小
              }),
            ]
          : []),
      ],
    },
    configure: (webpackConfig, { env, paths }) => {
      if (webpackConfig.mode === 'production') {
        //生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {};
        }
        //抽离公共代码
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        };
      }
      // 可以在这里添加其他 webpack 配置
      return webpackConfig;
    },
  },
};
