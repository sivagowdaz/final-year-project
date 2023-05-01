const path = require("path");
const webpack = require('webpack')
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    externals: nodeModules,
    entry: {
        login: './src/pages/login/Login.js',
        home: './src/pages/home/Home.js',
        classroom: './src/pages/classroom/Classroom.js',
        attendance: './src/pages/attendance/Attendance.js',
        attendance_record: './src/pages/attendance_record/AttendanceRecord.js',
        attendance_report:'./src/pages/attendance_report/AttendanceReport.js'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "[name].bundle.js"
    },
    devServer: {
        port: 3010,
    },
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
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
    new webpack.ProvidePlugin({
        process: 'process/browser',
        "React": "react",
    }),
    ],
   
}