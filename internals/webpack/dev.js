const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const { dllPlugin } = require(path.resolve(process.cwd(), 'package.json')); // eslint-disable-line import/no-dynamic-require

const plugins = [
  new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([{ from: `${dllPlugin.path}/reactDeps.dll.js`, to: 'reactDeps.dll.js' }]),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/, // exclude node_modules
    failOnError: false, // show a warning when there is a circular dependency
  }),
];

function dependencyHandlers() {
  if (process.env.BUILDING_DLL) return []; // Don't do anything during the DLL Build step
  const dllPath = path.resolve(process.cwd(), dllPlugin.path || 'node_modules/react-dlls');
  const manifestPath = path.resolve(dllPath, 'reactDeps.json');
  const dllReferencePlugin = [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath), // eslint-disable-line
    }),
  ];

  // if (!dllPlugin) return commonsChunkPlugin;
  // If the package.json does not have a dllPlugin property, use the CommonsChunkPlugin
  if (!dllPlugin.dlls) {
    /* exclude any server side dependencies by listing them in dllConfig.exclude */
    if (!fs.existsSync(manifestPath)) {
      console.error('The DLL manifest is missing. Please run `npm run build:dll`');
      process.exit(0);
    }
    return dllReferencePlugin;
  }

  // If DLLs are explicitly defined, we automatically create a DLLReferencePlugin for each of them.
  const dllManifests = Object.keys(dllPlugin.dlls).map(name => path.join(dllPath, `/${name}.json`));
  return dllManifests.map(
    (/* manifestPath */) => {
      if (!fs.existsSync(path) && !fs.existsSync(manifestPath)) {
        console.error(`The following Webpack DLL manifest is missing: ${path.basename(manifestPath)}`);
        console.error(`Expected to find it in ${dllPath}`);
        console.error('Please run: npm run build:dll');
        process.exit(0);
      }
      return dllReferencePlugin;
    }
  );
}

module.exports = require('./base')({
  entry: [
    // Add hot reloading in development
    // 'eventsource-polyfill', // Necessary for hot reloading with IE; install using npm
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/index.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  mode: 'development',
  plugins: dependencyHandlers().concat(plugins),
  devtool: 'eval-source-map',
  performance: { hints: false },
});
