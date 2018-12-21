const router = require('koa-router')();
const db = require('../sql/sql');

router.post('/',async ctx => {
  let params = ctx.request.body;
  await db.query('update lists set name=?,address=?,tel=? where id=?',[params.name,params.address,params.tel,params.id]).then(res => {
    if (res){
      ctx.body = {
        code:'111',
        msg:'修改成功'
      }
    } else {
      ctx.body = {
        code:'000',
        msg:'修改失败'
      }
    }
  })
});

module.exports = router.routes();
