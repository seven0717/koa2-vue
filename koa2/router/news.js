const router = require('koa-router')();
const db = require('../sql/sql');

router.get('/',async ctx => {
  await db.query('select * from news').then(res => {
   if (!res){
     ctx.body = {
       msg:'数据为空',
       code:'000'
     }
   } else{
     ctx.body = {
       res,
       msg: '查询成功',
       code: '111'
     }
   }
  })
});

module.exports = router.routes();
