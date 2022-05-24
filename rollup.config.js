import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const dist = 'dist';
const bundle = 'bundle';
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      name: 'showFrameModal',
      file: `${dist}/${bundle}.umd.js`,
    },
    {
      format: 'es',
      file: `${dist}/${bundle}.es.js`,
    },
    {
      format: 'cjs',
      file: `${dist}/${bundle}.cjs.js`,
    },
  ],
  plugins: [typescript(), production && terser()],
};
