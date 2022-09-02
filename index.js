const express = require("express")
const app = express()
const router = require("./router")


// const koa = require("koa")
// const app = new koa()
// const bodyParser = require("koa-bodyparser")


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://bayn:<password>@shortsaver.4vempyp.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.all("*",function(req,res,next){
    // 设置允许跨域的域名,*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin','*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers','content-type');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');
    if(req.method.toLowerCase() == 'options')
        res.send(200); // 让options 尝试请求快速结束
    else
        next();
})


// app.use(async (ctx,next)=>{
// 	ctx.set('Access-Control-Allow-Origin','*')
// 	ctx.set('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
// 	ctx.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
// 	if(ctx.method=='OPTIONS'){
// 		ctx.body = 200;
// 	}else{
// 		await next()
// 	}
// })
// app.use(bodyParser())
//使用body-parser插件 否则无法获取post的request.body
app.use(router)
// app.get("/get/:id",(req,res)=>{
//     res.send(req.params);          
// })

//还能写成('/sta',express.static("./static"))表示在uri上加入/sta
app.use(express.static("./static"))

app.listen(80)

module.exports=app