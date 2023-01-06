const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')

class JwDevtoolsPlugin {
  constructor (options = {}) {
    fs.writeFileSync(
      path.resolve(__dirname, 'config.json'),
      JSON.stringify(options, null, 2),
      {}
    )
  }

  apply (compiler) {
    if (compiler.hooks) {
      // webpack4.x
      compiler.hooks.entryOption.tap({ name: 'TOOL_BOX_PLUGIN' }, this.addDevtoolsSource.bind(this))
    } else {
      // ${webpack version} < 4
      compiler.plugin('entry-option', this.addDevtoolsSource.bind(this))
    }
  }

  addDevtoolsSource (context, entry) {
    const sourcePath = pkg.name + '/devtools-init.js'
    if (typeof entry === 'string') {
      entry = [sourcePath, entry]
    } else if (Array.isArray(entry)) {
      entry.unshift(sourcePath)
    } else if (isObject(entry)) {
      addSource(entry)
    }

    function addSource (entry) {
      for (const [, val] of Object.entries(entry)) {
        if (typeof val === 'string') {
          entry = [sourcePath, entry]
        } else if (Array.isArray(val)) {
          val.unshift(sourcePath)
        } else {
          addSource(val)
        }
      }
    }
  }
}

function isObject (v) {
  return Object.prototype.toString.call(v) === '[object Object]'
}

module.exports = JwDevtoolsPlugin
