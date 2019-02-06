const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'index.jsx'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	mode: process.env.NODE_ENV || 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]_[local]_[hash:base64]'
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		port: 4000,
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html')
		})
	],
	resolve: { extensions: ['.js', '.jsx'] }
};
