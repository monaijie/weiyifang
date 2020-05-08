//资源模块引入
const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate =require('consolidate');
const expressRoute = require('express-route');

//服务器开启
var server = express();
server.listen(8080);

//文件上传配置
const multerObj = multer({dest:'./static/upload'});
server.use(multerObj.any());

//获取请求数据
server.use(bodyParser.urlencoded());

//处理cookie 、session
server.use(cookieParser());
(function(){
   var keys = [];
   for(var i=0;i<10000;i++){
     keys[i]='session_'+Math.random();
   }
   server.use(cookieSession({
     name:"session_id",
     keys:keys,
     maxAge:20*60*1000 //20分钟过期
   }));
})();

//处理ejs模板
server.engine('html', consolidate.ejs);
server.set('views', 'template');
server.set('view engine', 'html');

//处理路由
//server.use('/',require('./route/web')());
server.use('/admin/',require('./route/admin')());

//请求静态文件
server.use(static('./static/'));




