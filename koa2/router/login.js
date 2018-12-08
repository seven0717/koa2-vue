const router = require('koa-router')();

router
  .post('/', async ctx => {
    ctx.body = {
      user:'111',
      code:1,
      status:200
    };
  });

module.exports = router.routes();
