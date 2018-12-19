const router = require('koa-router')();
const db = require('../sql/sql');
const times = require('../date/date');

// 增加用户
router.post('/', async (ctx) => {
  await db.query('select * from lists where name=?', [ctx.request.body.name]).then(res => {
    try {
      //  判断前台传过来的数据的用户名，在数据库中有没有，如果没有择添加到数据库中，如果有择返回相应的状态码
      if (res.length === 0) {
        // 获取时间
        let t = times();
        db.query(`insert into lists (name,address,tel,date) values ("${ctx.request.body.name}","${ctx.request.body.address}","${ctx.request.body.tel}","${t}")`)
        ctx.body = {
            msg:'用户添加成功',
            code:'111'
          }
      } else {
        ctx.body = {
          msg: '用户名已存在，请重新输入',
          code: '000'
        }
      }
    } catch (e) {
      console.log(e);
    }

  })
});

module.exports = router.routes();
