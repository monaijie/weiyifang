const express=require('express');
const common=require('../../../../libs/common');
var db = common.Mysql();

module.exports=function (){
  var router=express.Router();

  //页面渲染接口
  router.get('/index',(req,res)=>{
    res.render('admin/view/Contact/message/index.ejs',{})
  });
  router.get('/edit',(req,res)=>{
    res.render('admin/view/Contact/message/edit.ejs',{})
  });
  
  //渲染表单
  router.get('/messageList',(req,res)=>{
    console.log(0)
     db.query(`SELECT * FROM messageList`,(err,data)=>{
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
