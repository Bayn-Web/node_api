var MongoClient = require('mongodb').MongoClient;


const uri = "mongodb+srv://bayn:1404197509@shortsaver.4vempyp.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const options = {
    findByUrl:async (url,short)=>{
        var backData = []
        await new Promise((resolve)=>{
            MongoClient.connect(uri, async (err, db)=> {
                if (err) throw err;
                var dbo = db.db("myshorter");
                await dbo.collection("urls"). find({$or:[{url},{short}]}).toArray(function(err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    resolve(result);
                    db.close();
                    console.log("db is closed")
                });
            });
        }).then(res=>{
            backData = backData.concat(res)
        })
        return backData
    },
    save:async (newUrl,oldUrl)=>{
        var back
        await new Promise((resolve)=>{
            MongoClient.connect(uri, async (err, db)=> {
                if (err) throw err;
                var dbo = db.db("myshorter");
                await dbo.collection("urls"). insertOne({url:oldUrl,short:newUrl},(err, result)=>{
                    if (err) throw err;
                    resolve(result);
                    db.close();
                    console.log("db is closed")})
                })
        }).then(res=>{
            back = Object.assign({}, res) 
        })
        return back
    },
    // checkIfRepeat:async (url)=>{
    //     var back
    //     await new Promise((resolve)=>{
    //         MongoClient.connect(uri, async (err, db)=> {
    //             if (err) throw err;
    //             var dbo = db.db("myshorter");
    //             await dbo.collection("urls"). findOne({url},(err, result)=>{
    //                 if (err) throw err;
    //                 resolve(result);
    //                 db.close();
    //                 console.log("db is closed")})
    //             })
    //     }).then(res=>{
    //         back = Object.assign({}, res) 
    //     })
    //     return back
    // }
}


module.exports = options
