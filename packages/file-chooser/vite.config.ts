import { defineConfig } from 'vite'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

export default defineConfig({
  plugins: [
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        extend: true,
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
                modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
                
                /* --- iife corejs 内联解决方案(1/3) --- */
                // "useBuiltIns": "entry", // browserslist环境不支持的所有垫片都导入
                // "corejs": {
                //   "version": 3, // 使用core-js@3
                //   "proposals": true,
                // }
              },
            ],
          ],
          
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                'absoluteRuntime': false,
                'corejs': 3, // !TODO fix corejs会被作为模块导入 /* --- iife corejs 内联解决方案(2/3) --- */
                'helpers': true, // false内联的Babel Helper
                'regenerator': true
              }
            ]
          ]
        })
      ]
    },
    lib: {
      entry: './lib/main.ts',
      name: 'FileChooser',
      formats: ['es', 'umd'/* , 'iife' */],
      // fileName: 'file-chooser'
      fileName: (format) => `file-chooser.${format}.js` // 打包后的文件名
    }
  }
})
