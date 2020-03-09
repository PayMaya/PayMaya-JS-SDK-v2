import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.ts', // our source file
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    plugins: [terser()],
    name: 'PayMayaSDK'
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
