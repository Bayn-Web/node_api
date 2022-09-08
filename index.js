const router = require("./router")
const koa = require("koa")
const app = new koa()
const bodyParser = require("koa-bodyparser")
const operation = require("./DB")

// operation.save("baidu.com","aaa").then(res=>{
// 	console.log(res)
// })


app.use(async (ctx,next)=>{
	ctx.set('Access-Control-Allow-Origin','*')
	ctx.set('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
	ctx.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
	if(ctx.method=='OPTIONS'){
		ctx.body = 200;
	}else{
		await next()
	}
})
app.use(bodyParser())
//使用body-parser插件 否则无法获取post的request.body
app.use(router.routes()).use(router.allowedMethods());

// 还能写成('/sta',express.static("./static"))表示在uri上加入/sta
// app.use(express.static("./static"))

app.listen(80)

module.exports=app