var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.post('/', function(req, res, next) {
  // console.log(req.body)
  let {username} = req.body;

  mgdb(
    {collection:'user'},
    ({collection,client})=>{
      collection.find(
        {username:username},
        {
          projection:{_id:0}
        }
      ).toArray((err,result)=>{
        if(!err && result.length>0){
          res.send({error:0,msg:'找到了',data:result});
        }else{
          res.send({error:1,msg:'没找到这个用户'})
        }
        client.close();
      })
    }
  )


});
module.exports = router;
