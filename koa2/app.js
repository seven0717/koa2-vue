const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();
const login = require('./router/login.js');
const cors = require('koa2-cors');
const app = new Koa();



app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/login') {
      return "*"; // 允许来自所有域名请求
    }
    return 'http://localhost:8080';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

router.use('/login',login);
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000);
