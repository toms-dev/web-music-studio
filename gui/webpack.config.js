var path = require('path');

/**
 * Created by Louis on 18/01/2016.
 */
module.exports = {
    entry: './js/main.jsx',
    output: {
        path: './build/',
        filename: 'js/index.js'
    },
    devServer: {
        inline: true,
        port: 3333,
		headers: { "Access-Control-Allow-Origin": "*" }
    },
	devtool: "#inline-source-map",
    resolve: {
        extensions: [
            "",
            ".js",
            ".jsx",
            ".json",
            ".css"
        ],
		root: path.join(__dirname, "node_modules"),
		fallback: path.join(__dirname, "node_modules")
    },
	resolveLoader: {
		root: path.join(__dirname, "node_modules"),
		fallback: path.join(__dirname, "node_modules")
	},
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            /*{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },*/
            {
                test: /\.json$/,
                loaders: ["json"]
            },
            {
                test: /\.css$/,
                loaders: ["css"]
            }
        ]
    },
    externals: {
        'CLIP_EDITOR_X': "4",
        'CLIP_EDITOR_Y': "6",
        'NB_CHAN': "5",
        'NB_TRACK': "0"
    }
};
