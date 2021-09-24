const express = require('express')
const app = express(); 
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT;
const myUsername = process.env['username']
const myPassword = process.env['password']


const dbURI = `mongodb+srv://${myUsername}:${myPassword}@router.fnopf.mongodb.net/Router?retryWrites=true&w=majority`
const Speed = require('./model/speed')
const Usage = require('./model/usage')


mongoose.connect(dbURI)
    .then((result) => console.log("connected to db"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.listen(3000, "192.183.30.11");

app.post('/speed', (req,res) => {
    console.log(req.body);
    let recievedinfo = new Speed(req.body)
    
    recievedinfo.save()
        .then((result) => {
                res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
} );

app.post('/usage', (req,res) => {
    console.log(req.body);
    let recievedusageinfo = new Usage(req.body)
    
    recievedusageinfo.save()
        .then((result) => {
                res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
} );

app.get('/data', (req, res) =>     {
    Speed.find({}, {
        _id : 0,
        updatedAt: 0,
        __v : 0
       } ,(err,foundData) => {
        if(err) {
            console.log(err);
        } else {
            var jsondatas = foundData;
            const totals = jsondatas.reduce((acc, cur) => {
                if (!acc[cur.user]) {
                  acc[cur.user] = {
                    totaldownloads: 0,
                    totaluploads: 0,
                  };
                }
                acc[cur.user].totaldownloads += parseFloat(cur.totaldownload);
                acc[cur.user].totaluploads += parseFloat(cur.totalupload);
                return acc;
              }, {});
            Object.entries(totals).forEach(entry => {
                const [key, value] = entry;
                var downloads = value.totaldownloads
                var ndvalue = downloads / 1073741824 
                value.totaldownloads = ndvalue.toFixed(3)
                var uploads = value.totaluploads
                var nuvalue = uploads / 1073741824 
                value.totaluploads = nuvalue.toFixed(3)
              });
            console.log("Message Sent")
            res.send(totals).status(200);    
        };
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.get('/code.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/code.js'));
  });

app.listen(PORT , () => console.log('Server started on port ' + PORT));

