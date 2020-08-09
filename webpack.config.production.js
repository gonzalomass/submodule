const path                       = require( 'path' );
const webpack                    = require( 'webpack' );
const minimatch                  = require( 'minimatch' );
const MiniCssExtractPlugin       = require( 'mini-css-extract-plugin' );
const StyleLintPlugin            = require( 'stylelint-webpack-plugin' );
const FriendlyErrorsPlugin       = require( 'friendly-errors-webpack-plugin' );
const { CleanWebpackPlugin }     = require( 'clean-webpack-plugin' );
const WebpackBuildNotifierPlugin = require( 'webpack-build-notifier' );
const ImageminPlugin             = require( 'imagemin-webpack-plugin' ).default;
const TerserPlugin               = require( 'terser-webpack-plugin' );
const globImporter               = require( 'node-sass-glob-importer' ); // no need this one
const devMode                    = 'development' === process.env.NODE_ENV;

class MiniCssExtractPluginCleanup {
	apply( compiler ) {
		compiler.hooks.emit.tapAsync(
			'MiniCssExtractPluginCleanup',
			( compilation, callback ) => {
				Object.keys( compilation.assets )
					.filter( asset => {
						return [
							'assets/css/*.js',
							'assets/css/*.js.map',
							'style.js',
							'style.js.map'
						].some( pattern => {
							return minimatch( asset, pattern );
						});
					})
					.forEach( asset => {
						delete compilation.assets[asset];
					});

				callback();
			}
		);
	}
}

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {

		// destination : source.
		'assets/js/theme': './assets/js/script.js',
		'assets/css/bundle': './assets/scss/main.scss',
		'assets/css/gutenberg-editor-styles': './assets/scss/gutenberg-editor-styles.scss'
	},
	output: {
		path: path.resolve( __dirname, 'dist/' ),
		filename: '[name].js'
	},
	resolve: {
		alias: {
			imagesFolder: path.resolve( __dirname, 'assets/images/' )
		}
	},
	devtool: devMode ? 'source-map' : 'cheap-source-map',
	performance: {
		maxAssetSize: 1000000
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
				terserOptions: {
					compress: true
				}
			})
		]
	},
	stats: {
		assets: true,
		builtAt: ! devMode,
		children: false,
		chunks: false,
		colors: true,
		entrypoints: ! devMode,
		env: false,
		errors: ! devMode,
		errorDetails: false,
		hash: false,
		maxModules: 20,
		modules: false,
		performance: ! devMode,
		publicPath: false,
		reasons: false,
		source: false,
		timings: ! devMode,
		version: false,
		warnings: ! devMode
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'eslint-loader',
						options: {
							failOnError: true,
							fix: false,
							emitWarning: true
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: ( resourcePath, context ) => {
								return path.relative( path.dirname( resourcePath ), context ) + '/';
							}
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: devMode
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: devMode
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: devMode
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/images',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/fonts',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets/images',
							name: '[name].[ext]'
						}
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{ removeTitle: false },
								{ convertColors: { shorthex: false } },
								{ convertPathData: false },
								{ removeViewBox: false }
							]
						}
					}
				]
			},
			{
				test: /\.po$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './../languages',
							name: '[name].mo'
						}
					},
					{
						loader: 'po2mo-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		devMode &&
			new FriendlyErrorsPlugin({
				clearConsole: false
			}),
		new CleanWebpackPlugin({
			root: path.resolve( __dirname, 'dist' ),
			cleanStaleWebpackAssets: false,
			verbose: ! devMode
		}),
		new StyleLintPlugin({
			files: 'assets/scss/**/*.s?(a|c)ss',
			fix: false,
			failOnError: true,
			syntax: 'scss'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		! devMode &&
			new ImageminPlugin({
				test: /\.(jpe?g|png|gif)$/i,
				cacheFolder: './imgcache'
			}),
		new MiniCssExtractPluginCleanup(),
		new WebpackBuildNotifierPlugin({
			title: "Infinity Build",
			logo: path.resolve("./screenshot.png"),
			suppressSuccess: false,
			successSound: "Pop",
			warningSound: "Submarine",
			failureSound: "Basso",
			showDuration: true
		})
	].filter( Boolean )
};
