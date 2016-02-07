/**
 * Created by Louis on 18/01/2016.
 */
module.exports = {
    entry: './main.js',
    output: {
        path: './build/',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 3333
    },
    resolve: {
        extensions: [
            "",
            ".js",
            ".json",
        ],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.json$/,
                loaders: [
                    "json",
                ],
            },
        ]
    },
    externals: {
        'CLIP_EDITOR_X': "4",
        'CLIP_EDITOR_Y': "6",
        'NB_CHAN': "5",
        'NB_TRACK': "0"
    }
}