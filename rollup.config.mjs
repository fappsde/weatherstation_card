import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/weatherstation-card.ts',
  output: {
    file: 'dist/weatherstation-card.js',
    format: 'es',
    sourcemap: dev ? true : false,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      declaration: false,
    }),
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { targets: { browsers: ['> 1%', 'not dead'] } }],
      ],
    }),
    !dev && terser(),
  ],
  watch: {
    exclude: 'node_modules/**',
  },
};
