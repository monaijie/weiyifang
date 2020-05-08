const express=require('express');
const common=require('../../../../libs/common');
var db = common.Mysql();

module.exports=function (){
  var router=express.Router();

  //页面渲染接口
  router.get('/index',(req,res)=>{
    res.render('admin/view/Contact/telephone/index.ejs',{})
  });
  router.get('/edit',(req,res)=>{
    res.render('admin/view/Contact/telephone/edit.ejs',{})
  });

  //渲染表格
  router.use('/telephoneList',(req,res)=>{
    db.query(`SELECT * FROM telephoneList`,(err,data)=>{
      if(err){
        res.status(500).send('database erro').end();
      }else{
        if(data.length==0){
          res.status(404).send('database erro').end();
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
