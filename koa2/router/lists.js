const router = require('koa-router')();
const db = require('../sql/sql');

// 查询
router.get('/', async (ctx) => {
  await db.query('select * from lists').then(res => {
    if (res === 0){
      ctx.body = {
        msg:'查无此数据',
        code:'101'
      }
    } else {
      ctx.body = {
        res:res
      }
    }
  })
});
module.exports = router.routes()
