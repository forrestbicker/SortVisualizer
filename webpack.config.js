module.exports = {
    devtool: "source-map",
    entry: "./src/app.ts",
    output: {
        path: __dirname + "/docs",
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
}