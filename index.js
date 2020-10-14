var express = require("express")
var app = express()
var fs = require("fs")
var upload = require("express-fileupload")
app.use(express.json());
app.use(upload())

var requestName
var filename

app.listen(3000, () => console.log("server on port 3000"))

app.get("/", (req, res) => {
    res.sendfile("index.html")
})

app.post("/name", (req,res) => {
    filename = `/downloads/${req.body.input}.jpg`
    fs.exists(filename, () => {
        requestName = req.body.input
    })
})

app.get("/download", (req, res) => {
    console.log(requestName)
        if(!requestName){
            res.send("404 du affe")
            console.log("404")
        }
        else{
            res.download(__dirname + `/downloads/${requestName}.jpg`, `${requestName}`)
            console.log(filename)
            }
})

app.post("/upload", (req,res) => {
    console.error("user data:")
    console.log("   ",req.headers['user-agent'], "\n   ",req.connection.remoteAddress)
    if(req.files){
        var file = req.files.foo,
            filename = file.name
        file.mv("./downloads/"+filename,(err) => {
            console.error(err)
        })
        console.log(filename)
    }
   // res.send("success hope you get redirected"
   res.redirect("/")
})