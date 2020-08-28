//1 导入gulp这个第三方模块
const gulp = require('gulp');

//2.1 导入gulp-cssmin这个第三方模块
const cssmin = require('gulp-cssmin');

//2.2 导入gulp-autoprefixer这个第三方模块
const autoprefixer = require('gulp-autoprefixer');

//3.1 导入gulp-uglify这个第三方模块
const uglify = require('gulp-uglify');

//3.2 导入gulp-babel这个第三方模块
const babel = require('gulp-babel');

//4.1 导入gulp-htmlmin这个第三方模块
const htmlmin = require('gulp-htmlmin')

//7.1 导入del这个第三方模块
const del = require('del')

//9.1 导入gulp-webserver这个第三方模块
const webserver = require("gulp-webserver")

//2.3 写一个打包css的方法
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')   
    .pipe(autoprefixer())        
    .pipe(cssmin())  
    .pipe(gulp.dest('./dist/css'))  
}

//3.3 书写一个打包js的方法
const jsHanlder = ()=>{
    return gulp.src('./src/js/*.js')   //找到src目录里面下的js目录下的所有后缀为.js的文件
    .pipe(babel({
        presets: ['@babel/env']
    }))    //转码es6转换成es5了,就可以压缩了
    .pipe(uglify())  //压缩
    .pipe(gulp.dest('./dist/js')) 
}

//4.2 书写一个打包html的方法
const htmlHandler = ()=>{
    return gulp.src(['./src/pages/*.html','./src/pages/*.htm'])  
    .pipe(htmlmin({
        "removeAttributeQuotes":true,   
        "removeComments":true,  
        "collapseBooleanAttributes":true,  
        "collapseWhitespace":true, 
        "minifyCSS":true, 
        "minifyJS":true,  
    })) //压缩
    .pipe(gulp.dest('./dist/pages')) 
}

//5.1 书写一个移动images文件夹的方法
const imgHandler = ()=>{
    return gulp.src('./src/images/**')  
    .pipe(gulp.dest('./dist/images')) 
}

//6.1 书写一个移动lib文件夹的方法
const libHandler = ()=>{
    return gulp.src('./src/lib/**')  
    .pipe(gulp.dest('./dist/lib'))   
}

//移动font
const fontHandler = ()=>{
    return gulp.src('./src/font/**')  
    .pipe(gulp.dest('./dist/font'))   
}
//移动servser
const seHandler = ()=>{
    return gulp.src('./src/server/**')  
    .pipe(gulp.dest('./dist/server'))   
}




//书写一个任务,自动删除dist目录
const delHandler = ()=>{
    return del(['./dist'])
}

/* 自动监控文件 */
const watchHandler = ()=>{
    //监控着src下的css下的所有csswe你按,只要一发生变化,就会自动执行一遍cssHandler这个任务
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHanlder);
    gulp.watch('./src/pages/*.html',htmlHandler);
    gulp.watch('./src/lib/**',libHandler);
    gulp.watch('./src/images/**',imgHandler)
    gulp.watch('./src/server/**',seHandler);
    gulp.watch('./src/font/**',imgHandler)
}

//服务器配置任务
const serverHandler = ()=>{
    return gulp.src('./dist') //找到我要打开网页的文件夹,把这个文件夹当做网站根目录
    .pipe(webserver({//需要一些配置项
        port:'8080', //端口号,0-65535,尽量不使用0-1023
        open:'./pages/index.html', //你默认打开的首页,从dist下面根目录开始书写
        livereload:true,//自动刷新浏览器,热重启
        //所有的代理配置都在proxies里面
        proxies:[
            //每一个代理配置就是一个对象
            {
                source:"/weather",//源,你的代理标识符
                target:'https://way.jd.com/jisuapi/weather',//目标,你要代理的地址
            }
        ]
    }))
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHanlder,htmlHandler,imgHandler,libHandler,seHandler,fontHandler),
    serverHandler,
    watchHandler
)
