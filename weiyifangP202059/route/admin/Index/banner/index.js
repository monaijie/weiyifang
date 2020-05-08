const express=require('express');
const common=require('../../../../libs/common');
var db = common.Mysql();

module.exports=function (){
  var router=express.Router();

  //页面渲染接口
  router.get('/index',(req,res)=>{
    res.render('admin/view/Index/banner/index.ejs',{})
  });
  router.get('/create',(req,res)=>{
    res.render('admin/view/Index/banner/create.ejs',{})
  });
  router.get('/edit',(req,res)=>{
    res.render('admin/view/Index/banner/edit.ejs',{})
  });

  //渲染表格
  router.get('/bannerList',(req,res)=>{
     db.query(`SELECT * FROM bannerList`,(err,data)=>{
        if(err){
          res.status(500).send('database error').end();
        }else{
          if(data.length==0){
            res.status(404).send('database error').end();
          }else{
            var tableList={
              "code": 0,
              "msg": "",
              "count": data.length,
              "data": data
            };
            res.send(tableList).end();
          }
        }
     });
  })
  return router;
};
