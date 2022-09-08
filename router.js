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
    await db.findByUrl(url, result).then(res=>{
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
    const body = ctx.request.body
    console.log(body);
    await db.findByUrl(ctx.request.body.url, ctx.request.body.newurl).then(res=>{
        if (res.length == 0){
            await db.save(ctx.request.body.url, ctx.request.body.newurl).then(res=>{
                console.log("add suc!")
                body.promision = true
            })
        }else{
            console.log("the url is repeat")
            result = "url repeated"
            body.promision = false
        }
    })
    //处理短链
    ctx.body=body
})


module.exports=router