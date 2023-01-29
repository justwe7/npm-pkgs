import { defineConfig } from 'vite'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

export default defineConfig({
  plugins: [
  ],
  build: {
    rollupOptions: {
      output: {
        exports: 'named', /** Entry module "lib/main.ts" is using named and default exports together. Consumers of your bundle will have to use `file-chooser.default` to access the default export, which may not be what you want. Use `output.exports: "named"` to disable this warning. */
      },
      plugins: [
        // https://github.com/vitejs/vite/issues/1639
        getBabelOutputPlugin({
          allowAllFormats: true,
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: false, // Default：false
                // https://babeljs.io/docs/en/babel-preset-env#modules
                modules: false,
              },
            ],
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                'absoluteRuntime': false,
                'corejs': 3,
                'helpers': true,
                'regenerator': true
              }
            ]
          ]
        })
      ]
    },
    lib: {
      entry: './lib/main.ts',
      name: 'file-chooser',
      // fileName: 'file-chooser'
      fileName: (format) => `file-chooser.${format}.js` // 打包后的文件名
    }
  }
})
