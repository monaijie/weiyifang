const express=require('express');
const common=require('../../../libs/common');

module.exports=function (){
  var router=express.Router();
  //页面渲染接口
  router.get('/', (req, res)=>{
    res.render('admin/view/Login/index.ejs', {});
  });

  //退出登录
  router.get('/signOut', (req, res)=>{
    res.render('admin/view/Login/index.ejs', {});
  });

  return router;
};
