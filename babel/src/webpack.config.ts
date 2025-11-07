//import { Resolver } from "webpack";
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
//const javaScriptObfuscator=require('webpack-obfuscator')

module.exports=(env:any,argv:any)=>{
    const isProd=argv.mode==='production';
    return{
        mode:argv.mode,
        entry:'index.ts',
        output : {
            filename:'bundle.js',
            path:path.resolve(__dirname,'dist'),
            clean:true
        },
        resolve:{
            extensions:['.ts','.tsx','.js','.jsx'],
            preferRelative:true
        },
        module:{
            rules:[
                {
                test:/.(ts|tx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
                }
            ]
        },
        optimization:isProd?{
            minimize:true,
            minimizer:[TerserPlugin({terserOptions:{
                compress:true,
                mangle:true,
                format:{
                    comments:false
                }
            },})]
        }:{},
    devtool:isProd?false:'source-map'
    };
};