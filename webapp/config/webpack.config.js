const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin({
        inlineSource: '.(js|css)$' // embed all javascript and css inline
    }),
  new HtmlWebpackInlineSourcePlugin()
]
