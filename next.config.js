const withAntdLess = require("next-plugin-antd-less")

module.exports = withAntdLess({ 
  modifyVars: { '@primary-color': '#7159c1' },
  lessVarsFilePathAppendToEndOfContent: true,

  nextjs: {
    localIdentNameFollowDev: true
  },

  webpack(config) {
    return config
  }
})
