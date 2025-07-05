const path = require("path");


module.exports = {
    devtool: "source-map",
    entry: {
        background: "./src/background.ts",
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    plugins: []
}