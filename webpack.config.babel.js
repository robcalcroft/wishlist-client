import path from "path";
import webpack from 'webpack';

export default {
    entry: [
      path.resolve(__dirname, 'app/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            jQuery: `${path.resolve('.')}/node_modules/jquery/dist/jquery.min.js`
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react','es2015']
                }
            },
            {
                test: /\.s?css$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery',
            moment: 'moment'
        })
    ]
};
