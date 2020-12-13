import css from 'rollup-plugin-css-only';
import typescript from 'rollup-plugin-typescript2';
import vue from "rollup-plugin-vue";

import pkg from './package.json';

const banner = `/**
 * Vue 3 Loading Overlay ${pkg.version}
 * (c) ${new Date().getFullYear()}
 * @license MIT
 */`;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: "dist/index.js",
      format: 'es',
      banner,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [   
    vue({
      css: true,
      compileTemplate: true
    }),
    css({ output: pkg.style }),
    typescript({
      typescript: require('typescript'),
    }),
  ],
};