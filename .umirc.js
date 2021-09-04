
import { resolve } from 'path';
export default {
  hash: true,
  minimizer: 'terserjs',
  treeShaking: true,
  history:'hash',
  base: '/',
  publicPath: '/',
  links: [
    {rel: 'icon', href: "./src/assets/favicon.ico"}
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: '绥德县行政事业单位干部职工工资查询系统',
      dll: false,
    }],
  ],
  alias: {
    '@': resolve(__dirname, './src'),
    '@utils': resolve(__dirname, './src/utils'),
    '@assets': resolve(__dirname, './src/assets'),
  },
}

