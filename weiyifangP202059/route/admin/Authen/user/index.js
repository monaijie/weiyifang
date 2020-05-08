const express=require('express');
const common=require('../../../../libs/common');
var db = common.Mysql();

module.exports=function (){
  var router=express.Router();

  //页面渲染接口
  router.get('/index',(req,res)=>{
    res.render('admin/view/Authen/user/index.ejs',{})
  });
  router.get('/create',(req,res)=>{
    res.render('admin/view/Authen/user/create.ejs',{})
  });
  router.get('/ChangePwd',(req,res)=>{
    res.render('admin/view/Authen/user/ChangePwd.ejs',{})
  });
  router.get('/edit',(req,res)=>{
    var id = req.query.id;
    db.query(`SELECT * FROM userInfoList WHERE id=${id}`,(err,data)=>{
       var fromData = data[0];
       if(fromData.enabledText==0){
        fromData.enabledText = false;
       }else{
        fromData.enabledText = true;
       }
       res.render('admin/view/Authen/user/edit.ejs',{mod_data: fromData})
    });
  });
  
  //表格渲染
  router.get('/userInfoList',(req,res)=>{
      db.query(`SELECT * FROM userInfoList `,(err,data)=>{
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

  //新增
  router.post('/create',(req,res)=>{
    var fromData = req.body;
    var newDate = parseInt(new Date().getTime()/1000);
    db.query(`INSERT INTO userInfoList (userName, email, fullName,enabledText,phone,newLoginPwd,registerTime) VALUE('${fromData.userName}', '${fromData.email}', '${fromData.fullName}', '${fromData.enabledText}', '${fromData.phone}', '${fromData.newLoginPwd}', '${newDate}')`, (err, data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        res.send({
          resultType:0,
          message:'添加成功'
        });
      }
    });
  });

  //修改
  router.post('/edit',(req,res)=>{
    var fromData = req.body;
    if(fromData.enabledText==false || fromData.enabledText==undefined){
      fromData.enabledText=0;
    }else{
      fromData.enabledText = 1;
    }
    console.log(fromData)
    db.query(`UPDATE userInfoList SET userName='${fromData.userName}',email='${fromData.email}',fullName='${fromData.fullName}' , enabledText='${fromData.enabledText}' , phone='${fromData.phone}' WHERE id=${fromData.id}`,(err, data)=>{
            if(err){
              console.error(err);
              res.status(500).send('database error').end();
            }else{
              res.send({
                resultType:0,
                message:'修改成功'
              });
            }
          }
        );
  });

  return router;
};
