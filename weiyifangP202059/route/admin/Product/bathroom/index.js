const express=require('express');
const common=require('../../../../libs/common');
var db = common.Mysql();

module.exports=function (){
  var router=express.Router();
  //页面渲染接口
  router.get('/index',(req,res)=>{
    res.render('admin/view/Product/bathroom/index.ejs',{})
  });
  router.get('/create',(req,res)=>{
    res.render('admin/view/Product/bathroom/create.ejs',{})
  });
  router.get('/edit',(req,res)=>{
    res.render('admin/view/Product/bathroom/edit.ejs',{})
  });

  //渲染表格列表
  router.get('/showerList',(req,res)=>{
    db.query(`SELECT * FROM showerList`,(err,data)=>{
      if(err){
        console.error(err);
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
    })
 
  });

  return router;
};
