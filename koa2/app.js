const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();
const login = require('./router/login.js');
const lists = require('./router/lists');
const adds = require('./router/adduser');
const news = require('./router/news');
const hchar = require('./router/hchar');
const edit = require('./router/edit');
const del = require('./router/del');
const cors = require('koa2-cors');
const app = new Koa();
require('./token/proving');
app.use(bodyparser());

app.use(cors({
	origin: function(ctx) {
		if (ctx.url === '/login') {
			return "*"; // 允许来自所有域名请求
		}
		return '*';
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 登陆
router.use('/login', login);
// 列表
router.use('/lists', lists);
// 添加
router.use('/adduser', adds);
// 新闻
router.use('/news', news);
// 图形化
router.use('/hchar', hchar);
// 编辑用户
router.use('/edit', edit);
// 删除用户
router.use('/delete',del);
app
	.use(router.routes())
	.use(router.allowedMethods());
app.listen(3000);
