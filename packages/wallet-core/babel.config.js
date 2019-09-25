module.exports = {
  "presets": [
    "@babel/preset-env",
    '@babel/preset-react'
  ],
  "plugins": [
    // [
    //   require.resolve("babel-plugin-module-resolver"),
    //   {
    //     "react": [
    //       "../../node_modules/react"
    //     ]
    //   }
    // ],
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}