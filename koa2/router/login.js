const router = require('koa-router')();
const db = require('../sql/sql');
const addtoken = require('../token/addtoken');

router
  .post('/', async ctx => {
    let user = ctx.request.body.user;
    let pass = ctx.request.body.pass;
    // 将接收到的前台数据和数据库中的数据匹配
    // 如果匹配成功 返回status 200 code 1
    // 不成功返回status 1000 code 0
    await db.query('select * from login where user=? and pass=?;', [user, pass]).then(res => {
      if (res.length === 0) {   // 数据库中没有匹配到用户
        ctx.body = {
          code: 0,
          status: 1000,
          msg: 'error'
        }
      } else {  //匹配到用户
        let tk = addtoken({user:res[0].user,id:res[0].id})
        ctx.body = {
          tk,
          user: res[0].user,
          code: 1,
          status: 200
        }
      }
    })

  });

module.exports = router.routes();
