const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#238636" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: {},
  },
  // https://webpack.js.org/configuration/dev-server/#devserver
  devServer: {
    port: "3005",

    open: false,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
