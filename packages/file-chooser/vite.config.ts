import { defineConfig } from 'vite'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

export default defineConfig({
  plugins: [
  ],
  build: {
    rollupOptions: {
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
      fileName: 'file-chooser'
    }
  }
})
