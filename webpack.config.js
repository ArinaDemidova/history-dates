const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: '@svgr/webpack',
            },
            {
                test: /\.svg$/i,
                issuer: { and: [/\.[^/?]+$/, { not: [/\.[jt]sx?$/] }] },
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};