const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'public/js/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js/dist'),
  },
};
