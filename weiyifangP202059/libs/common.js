const crypto=require('crypto');
const mysql = require('mysql');
module.exports={
  MD5_SUFFIX: 'FDSW$t34tregt5tO&$(#RHuyoyiUYE*&OI$HRLuy87odlfh是个风格热腾腾)',
  md5: function (str){
    var obj=crypto.createHash('md5');

    obj.update(str);

    return obj.digest('hex');
  },
  Mysql:function(){
    var db= mysql.createPool({
      host:'101.200.85.12',
      user:'monaijie',
      password:'mnj19950421',
      database:'weiyifang',
    });
    return db;
  },
  splicGetData:function(data){
    var formData = data;
    var str = '';
    for (var key in formData) {
        if (formData[key] !== '') {
            str += key + '=' + formData[key] + ' or ';
        }
    }
    str = str.substring(0, str.length - 3);
    return str;
  }
};
