const express = require('express')
const app = express(); 
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT;
const myUsername = process.env['username']
const myPassword = process.env['password']
const dbURI = `mongodb+srv://${myUsername}:${myPassword}@router.fnopf.mongodb.net/RouterTRY?retryWrites=true&w=majority`
const Speed = require('./model/speed')

mongoose.connect(dbURI)
    .then((result) => {
        app.listen(PORT , () => console.log('Server started on port ' + PORT));
                        })
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/timeseries', (req, res) => { 
    Speed.find({},{
      _id : 0,
      updatedAt : 0,
      __v: 0
    }, (err,foundData) => {
      if(err) {
        console.log(err);
      } else {
        const timeseries = {
            "datedata": [],
            "uploaddata": [],
            "downloaddata": []
        };
        var downloads=0;
        var uploads=0;
        Object.entries(foundData).forEach(element => {
            var [ key , value] = element ;
            Object.entries(value.data).forEach(entry => {
                var [ item , contents ] = entry
                if ( contents.user !== "AltaiW") {
                downloads+=Number(contents.download)
                uploads+=Number(contents.upload)
                }
            })
            timeseries.datedata.push(value.date);
            downloads=downloads / 1024
            timeseries.downloaddata.push(downloads.toFixed(2));
            uploads=uploads / 1024
            timeseries.uploaddata.push(uploads.toFixed(2));
        });
        res.send(timeseries);
      };
    }, {} )});

app.get('/userusage', (req, res) => { 
        Speed.find({},{
          _id : 0,
          updatedAt : 0,
          __v: 0
        }, (err,foundData) => {
          if(err) {
            console.log(err);
          } else {
            const usualdata=[];
            Object.entries(foundData).forEach(element => {
            var [ key , value ] = element;
            Object.entries(value.data).forEach(entry =>{
            var [ item , contents] = entry
            usualdata.push(contents) 
            });
            });
            const totals = usualdata.reduce((acc, cur) => {
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
            const userdata={
                "user": [],
                "totaluploads":[],
                "totaldownloads":[]
            };
            Object.entries(totals).forEach(entry => {
            const [key, value] = entry;
            userdata.user.push(key)
            var downloads = value.totaldownloads
            var ndvalue = downloads / 1073741824 
            userdata.totaldownloads.push(ndvalue.toFixed(3))
            var uploads = value.totaluploads
            var nuvalue = uploads / 1073741824 
            userdata.totaluploads.push(nuvalue.toFixed(3))
            });
            res.send(userdata);
          };
        }, {} )});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
    });
        
app.get('/code.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/code.js'));
    });
        
app.get('/rawdata', (req, res) => { 
    Speed.find({},{
        _id : 0,
        updatedAt : 0,
        __v: 0
    }, (err,foundData) => {
        if(err) {
            console.log(err);
        } else {
            res.send(foundData);
        };
        }, {} )});