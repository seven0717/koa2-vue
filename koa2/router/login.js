const router = require('koa-router')();
const db = require('../sql/sql');
const addtoken = require('../token/addtoken');
const proving = require('../token/proving');

router.post('/', async ctx => {
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
        let token = addtoken(res[0]);
        ctx.body = {
          user: res[0].user,
          token,
          code: 1,
          status: 200
        }
      }
    })
});

router.get('/test',async (ctx,next) => {
    let token = ctx.request.header.authorization;
    if (token){
    //  获取到token
      let res = proving(token);
        if (res && res.exp <= new Date()/1000){
          ctx.body = {
            message: 'token过期',
            code:3
          };
        } else {
          ctx.body = {
            message: '解析成功',
            code:1
          }
        }
    } else{  // 没有token
      ctx.body = {
        msg:'没有token',
        code:0
      }
    }
});
module.exports = router.routes();
