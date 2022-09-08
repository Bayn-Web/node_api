const koa = require("koa")
const Router = require("koa-router")
const app = new koa()
const router = new Router()
const db = require("./DB")


router.get("/get",async (ctx)=>{
    const {url} = ctx.query
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
    let len = 4
	while(len) {
		let index = Math.floor(Math.random() * str.length);
		result += str[index];
		--len;
	}
    await db.findByUrl(url).then(res=>{
        if (res.length == 0){
            db.save(result, url).then(res=>{
                console.log("add suc!")
            })
        }else{
            console.log("the url is repeat")
            result = "url repeated"
        }
        ctx.body = {newurl : result}
    })
})

router.post("/post",async (ctx)=>{
    console.log(ctx.url);  
    // req.body.newurl=req.body.newurl
    const body = ctx.request.body
    //判断输入链接是否与数据库重复
    console.log(body);
    //判断输入短链是否与数据库重复
    // const returnbody = req.body
    body.promision = true
    //处理短链
    ctx.body=body
})


module.exports=router