const express=require('express');
const common=require('../../../../libs/common');
var db = common.Mysql();

module.exports=function (){
  var router=express.Router();

  //页面渲染接口
  router.get('/index',(req,res)=>{
    res.render('admin/view/Product/customiz/index.ejs',{})
  });
  router.get('/create',(req,res)=>{
    res.render('admin/view/Product/customiz/create.ejs',{})
  });
  router.get('/edit',(req,res)=>{
    res.render('admin/view/Product/customiz/edit.ejs',{})
  });

  //渲染表格列表
  router.get('/customizList',(req,res)=>{
    var page = req.query.page;
    var limit =req.query.limit;
    db.query(`SELECT * FROM customizList`,(err,dataA)=>{
        if(err){
          res.status(500).send('database error').end();
        }else{
          var count = dataA.length;
          db.query(`SELECT * FROM customizList LIMIT ${(page-1)*10},${limit}`,(err,data)=>{
            var dats = `${(page-1) * limit,55}`
            if(err){
              console.error(err);
              res.status(500).send('database error').end();
            }else{
              var tableList={
                "code": 0,
                "msg": "",
                "count": count,
                "data": data
              };
              res.send(tableList).end();
            }
          });    
        }
    });
  })
  return router;
};
