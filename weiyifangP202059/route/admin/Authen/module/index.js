const express=require('express');
const common=require('../../../../libs/common');
var db = common.Mysql();
module.exports=function (){
  var router=express.Router();

  //页面渲染接口
  router.get('/index',(req,res)=>{
    res.render('admin/view/Authen/module/index.ejs',{})
  });
  router.get('/create',(req,res)=>{
    res.render('admin/view/Authen/module/create.ejs',{})
  });
  router.get('/edit',(req,res)=>{
    console.log(req.query);
    res.render('admin/view/Authen/module/edit.ejs',{})
  });

  //表格渲染
  router.get('/moduleList',(req,res)=>{
    db.query(`SELECT * FROM moduleList `,(err,data)=>{
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
    });
});

  return router;
};
