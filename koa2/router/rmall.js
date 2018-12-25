const router = require('koa-router')();
const db = require('../sql/sql');

router.post('/',async ctx => {
  let res = ctx.request.body;
  var keys=[];//定义一个数组用来接受key
  var values=[];//定义一个数组用来接受value
  // console.log(res);
  for (var key in res){
    keys.push(key);
    values.push(res[key])
  }
  for (let i = 0; i < values.length; i++){
    await db.query('delete from lists where id=?',[values[i]]).then(data => {
      ctx.body = {
        msg:'删除成功',
        code:'111'
      }
    })
  }
});

module.exports = router.routes();
