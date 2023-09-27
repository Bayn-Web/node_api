const koa = require("koa")
const Router = require("koa-router")
const app = new koa()
const router = new Router()
const db = require("./DB")


router.get("/get", async (ctx) => {
    const { url } = ctx.query
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    let len = 4
    while (len) {
        let index = Math.floor(Math.random() * str.length);
        result += str[index];
        --len;
    }
    await db.findByUrl(url, result).then(async res => {
        if (res.length == 0) {
            await db.save(url, result).then(res => {
                console.log("add suc!")
            })
        } else {
            console.log("the url is repeat")
            result = "url repeated"
        }
        ctx.body = { newurl: result }
    })
})

router.get("/short", async (ctx) => {
    const { url } = ctx.query
    console.log(url)
    let realUrl = ""
    await db.findByUrl("", url).then(res => {
        console.log(res)
        if (res.length == 0) {
            realUrl = "wrong short url"
            console.log("wrong short url")
        } else {
            realUrl = res.at(0).url
        }
        ctx.body = { realurl: realUrl }
    })
})


router.post("/post", async (ctx) => {
    console.log(ctx.url);
    const body = ctx.request.body
    body.promision = false
    await db.findByUrl(ctx.request.body.url, ctx.request.body.newurl).then(async res => {
        if (res.length == 0) {
            await db.save(ctx.request.body.url, ctx.request.body.newurl).then(res => {
                console.log("add suc!")
                body.promision = true
            })
        }
    })
    ctx.body = body
})

router.get("/", async (ctx) => {
    const { url } = ctx.query
    console.log(url)
    let realUrl = ""
    await db.findByUrl("", url).then(res => {
        console.log(res)
        if (res.length == 0) {
            result = "wrong short url"
            console.log("wrong short url")
        } else {
            realUrl = res.at(0).url
        }
        ctx.body = { realurl: realUrl }
    })
})

module.exports = router