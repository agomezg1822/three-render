const path = require("path");
const pkg = require("./package.json");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const buildPath = "./docs/";

const base =
  process.env.BUILD === "production"
    ? "https://agomezg1822.github.io/visualizacion-3d/"
    : false;

module.exports = {
  entry: ["./src/entry.js"],
  output: {
    path: path.join(__dirname, buildPath),
    filename: "[name].[hash].js",
  },
  mode: "development",
  target: "web",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: path.resolve(__dirname, "./node_modules/"),
      },
      {
        test: /\.(jpe?g|png|gif|svg|tga|glb|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
        use: "file-loader",
        exclude: path.resolve(__dirname, "./node_modules/"),
      },
      {
        test: /\.(xlsx)$/i,
        use: "file-loader",
        exclude: path.resolve(__dirname, "./node_modules/"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Visualizacion 3D",
      base,
      templateContent: ({ htmlWebpackPlugin }) => `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${htmlWebpackPlugin.options.title}</title>
            <base href="${htmlWebpackPlugin.options.base}">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="styles.css"> <!-- Ruta relativa sin barra inclinada inicial -->
          </head>
          <body>
          <script src="Pie.js"></script>
          <script>
          if(window) {
            window.baseURL = ${base}
          }
          </script>
          </body>
        </html>`,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/public", to: "" },
        { from: "src/public/styles.css", to: "styles.css" }, // Copia styles.css al directorio de salida
        { from: "src/public/datos.xlsx", to: "datos.xlsx" },
      ],
    }),
  ],
};
