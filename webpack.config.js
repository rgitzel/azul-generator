const path = require('path');

module.exports = {
  entry: './build/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
    module: {
        rules: [
            {
                test: /node_modules\/(pdfkit|fontkit|png-js|linebreak|unicode-properties|brotli)\//,
                loader: "transform-loader?brfs"
            },
            {
                test: /node_modules\/unicode-properties.*\.json$/,
                use: 'json-loader'
            }
        ]
    }
};

