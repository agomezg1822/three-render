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
            <!-- Los scripts se inyectarán aquí -->
            <script defer src="${htmlWebpackPlugin.files.js[0]}"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
            <script>
              fetch('${base}datos.xlsx')
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.arrayBuffer();
                })
                .then(data => {
                  const workbook = XLSX.read(data, { type: 'array' });
                  console.log(workbook);
                })
                .catch(error => console.error('Error al cargar el archivo datos.xlsx:', error));
            </script>
          </body>
        </html>`,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/public", to: "" },
        { from: "src/public/styles.css", to: "styles.css" }, // Copia styles.css al directorio de salida
        { from: "src/public/datos.xlsx", to: "datos.xlsx" }, // Copia datos.xlsx al directorio de salida
      ],
    }),
  ],
};
