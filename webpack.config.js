// webpack.config.js
module.exports = {
    module: {
      rules: [
        {
            test: /\.html$/,
            use: ['html-loader'],
        },
      ],
    },
  };  