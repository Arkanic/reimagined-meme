const path = require("path");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",

    stats: {
        children: true
    },

    entry: [
        "./src/client/index.ts"
    ],
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        moduleIds: "deterministic",
        minimizer: [
            new TerserJSPlugin({})
        ]
    },
    resolve: {
        extensions: [
            ".ts", ".tsx",
            ".js",
            ".css", ".scss"
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-modules-typescript-loader"
                    },
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: false
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "pug-html-loader"
                    }
                ]
            }
        ]
    },
    
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/client/templates/index.pug"
        }),
        new CleanWebpackPlugin()
    ]
};