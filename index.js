const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const PORT = 3000;
const myUsername = process.env['username']
const myPassword = process.env['password']
const dbURI = `mongodb+srv://${myUsername}:${myPassword}@router.fnopf.mongodb.net/RouterTRY?retryWrites=true&w=majority`
const Speed = require('./model/speed')

mongoose.connect(dbURI)
  .then((result) => {
    app.listen(PORT, () => console.log('Server started on port ' + PORT));
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/speed', (req, res) => {
  console.log(req.body);
  let recievedinfo = new Speed(req.body)
  recievedinfo.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
    });
        
app.get('/code.js', function(req, res) {
    res.sendFile(path.join(__dirname, '/code.js'));
    });    

app.get('/userusage', (req, res) => { 
        Speed.find({},{
          _id : 0,
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
            userdata.totaldownloads.push(Number(ndvalue.toFixed(3)))
            var uploads = value.totaluploads
            var nuvalue = uploads / 1073741824 
            userdata.totaluploads.push(Number(nuvalue.toFixed(3)))
            });
            res.send(userdata);
          };
        }, {} )});

app.get('/timeseries', (req, res) => { 
    Speed.find({},{
      _id : 0,
      __v: 0
    }, (err,foundData) => {
      if(err) {
        console.log(err);
      } else {
 const userdata = {
    "mi4adates": [ ],
    "mi4auploads": [],
    "mi4adownloads": [],
    "mi4cdates": [],
    "mi4cuploads":[],
    "mi4cdownloads": []
};
Object.entries(foundData).forEach(entries => {
    const [ index , value ] = entries
    var uploadstotal=0;
    var downloadtotal=0;
    if ( value.source == "MI-4A" )  {
        Object.entries(value.data).forEach(entry => {
            const [ key , mi4adata ] = entry
            if ( mi4adata.user !== "AltaiW" ) {
            uploadstotal += Number(mi4adata.upload);
            downloadtotal += Number(mi4adata.download); }
        })
        userdata.mi4adates.push(value.date);
        userdata.mi4auploads.push(Number((uploadstotal / 1024).toFixed(3)));
        userdata.mi4adownloads.push(Number((downloadtotal / 1024).toFixed(3)));
    }
    if ( value.source == "MI-4C" )  {
        Object.entries(value.data).forEach(entry => {
            const [ key , mi4cdata ] = entry
            uploadstotal += Number(mi4cdata.upload);
            downloadtotal += Number(mi4cdata.download);
        })
        userdata.mi4cdates.push(value.date);
        userdata.mi4cuploads.push(Number((uploadstotal / 1024).toFixed(3)));
        userdata.mi4cdownloads.push(Number((downloadtotal /  1024).toFixed(3)));
        }
      })
        res.send(userdata);
      };
    }, {} )});

app.get('/format.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/format.css'));
    });