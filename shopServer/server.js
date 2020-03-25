const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID; // 用來建構MongoDBID物件

// 資料庫的名稱
const dbName = 'b03801053';

// 設定預設port為 1377，若系統環境有設定port值，則以系統環境為主
app.set('port', (process.env.PORT || 1377))

// 設定靜態資料夾
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// query 功能
app.get('/query', function (req, res) {

    //匯入檔案
    var fs = require('fs');
    fs.readFile('./hw2.json', 'utf8',
        function (error, data) {
            if (error) {
                console.log('無法匯入檔案')
                return;
            }
            var data = JSON.parse(data);

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");


            var response = {
                result: true,
                data: data

            }

            // 查詢mongodb資料
            MongoClient.connect(process.env.DATABASE, function (error, db) {
                if (error) {
                    response.result = false
                    response.message = "資料庫連接失敗，" + err.message
                    res.json(response)
                    return
                }
                // use dbName

                const dbo = db.db(dbName);
                console.log(`collection:${dbo}`)
                dbo.collection("shop", function (error, collection) {
                    if (error) {
                        console.log('資料庫內無 B03801053 的 collection')
                        return
                    }


                    console.log(`data${collection.find(response)}`)
                    res.json(response)
                })
            });


        })


})


// 啟動且等待連接
app.listen(app.get('port'), function () {
    console.log('Server running at http://127.0.0.1:' + app.get('port'))
})