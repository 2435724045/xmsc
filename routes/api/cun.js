var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.post('/', function(req, res, next) {
  console.log("cun这个接口")
  console.log(req.body)
  let {username,cardata} = req.body;
  
  console.log(username,cardata)

  mgdb(
    {collection:'user'},
    ({collection,client})=>{
      collection.updateOne(
        {username:username},{$set:{car:cardata}}),false,false,(err,result)=>{
        if(!err && result.length.n>0){
          res.send({error:0,msg:'存成功了',data:result});
        }else{
          res.send({error:1,msg:'存失败了'})
        }
  
      }
      
    }
  )


});
module.exports = router;
