
import { resolve } from 'path';
export default {
  hash: true,
  minimizer: 'terserjs',
  treeShaking: true,
  history:'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'GOV',
      dll: false,
    }],
  ],
  alias: {
    '@': resolve(__dirname, './src'),
    '@utils': resolve(__dirname, './src/utils'),
    '@assets': resolve(__dirname, './src/assets'),
  },
}

