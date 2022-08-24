const app = require("express")
const router = app.Router()

router.use(app.json())
router.get("/get",(req,res)=>{
    req.query.url=req.query.url
    console.log(req.query.url);
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
    let len = 4
	while(len) {
		let index = Math.floor(Math.random() * str.length);
		result += str[index];
		--len;
	}
    //生成4位随机string[]
    res.send({"newurl":result});
})

router.post("/post",(req,res)=>{
    req.body.url=req.body.url
    req.body.newurl=req.body.newurl
    const body = req.body
    //判断输入链接是否与数据库重复
    console.log(body);
    //判断输入短链是否与数据库重复
    const returnbody = req.body
    returnbody.promision = true
    //处理短链
    res.send(req.body);
})

module.exports=router