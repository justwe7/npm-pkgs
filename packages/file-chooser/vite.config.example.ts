import { defineConfig } from 'vite'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import * as path from 'path'

export default defineConfig({
  plugins: [
  ],
  base: './',
  build: {
    outDir: 'dist-example',
    assetsDir: './',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        drag: path.resolve(__dirname, 'example/drag/index.html'),
      },
      output: {
        // format: 'umd',
        // inlineDynamicImports: !true,
        // exports: 'named', /** Entry module "lib/main.ts" is using named and default exports together. Consumers of your bundle will have to use `file-chooser.default` to access the default export, which may not be what you want. Use `output.exports: "named"` to disable this warning. */
      },
    },
    // lib: {
    //   entry: './lib/main.ts',
    //   name: 'file-chooser',
    //   // fileName: 'file-chooser'
    //   fileName: (format) => `file-chooser.${format}.js` // 打包后的文件名
    // }
  }
})
