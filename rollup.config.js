import buble from 'rollup-plugin-buble'
import {uglify} from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'index.js',
      exports: 'default',
      format: 'umd',
      name: 'MonkeyPatchObject',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [
        buble(),
        filesize()
      ]
  }, {
    input: 'src/index.js',
    output: {
      file: 'index.min.js',
      exports: 'default',
      format: 'umd',
      name: 'MonkeyPatchObject',
      sourcemap: true
    },
    plugins: [
      buble(),
      uglify({ mangle: true, compress: true }),
      filesize()
    ]
  }
]
