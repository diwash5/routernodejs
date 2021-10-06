const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const PORT = 3000;
const myUsername = process.env['username']
const myPassword = process.env['password']
const dbURI = `mongodb+srv://diwash:diwash221122@router.fnopf.mongodb.net/RouterTRY?retryWrites=true&w=majority`
const Speed = require('./model/speed')

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

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

app.get('/aaplmi4aupload', (req, res) => {
    Speed.find({ source:"MI-4A"}, (err, foundData) => {
        if (err) {
        console.log(err)
        } else {
            originalData = []
            console.log(foundData.length)
            const timeseries = [];
            var uploads = 0;
            Object.entries(foundData).forEach(entry => {
              var [key, value] = entry;
              Object.entries(value.data).forEach(entries => {
                var [index, contents] = entries;
                if (contents.user !== "AltaiW") {
                  uploads += Number(contents.upload)
                }
              })
              var dataDate = Date.parse(value.date);
              uploads = uploads / 1024
              uploads = uploads.toFixed(2)
              timeseries.push([dataDate, Number(uploads)])
            })
            res.send(timeseries).status(200)
          }
        })
})

app.get('/mi4adownload-mfst-c.json', (req, res) => {
    Speed.find({ source:"MI-4A"}, (err, foundData) => {
        if (err) {
        console.log(err)
        } else {
            originalData = []
            console.log(foundData.length)
            const timeseries = [];
            var downloads = 0;
            Object.entries(foundData).forEach(entry => {
              var [key, value] = entry;
              Object.entries(value.data).forEach(entries => {
                var [index, contents] = entries;
                if (contents.user !== "AltaiW") {
                  downloads += Number(contents.download)
                }
              })
              var dataDate = Date.parse(value.date);
              downloads = downloads / 1024
              downloads = downloads.toFixed(2)
              timeseries.push([dataDate, Number(downloads)])
            })
            res.type("application/json")
            res.send(timeseries).status(200)
          }
        })
})

app.get('/mi4cupload', (req, res) => {
    Speed.find({ source:"MI-4C"}, (err, foundData) => {
        if (err) {
        console.log(err)
        } else {
            originalData = []
            console.log(foundData.length)
            const timeseries = [];
            var downloads = 0;
            var uploads = 0;
            Object.entries(foundData).forEach(entry => {
              var [key, value] = entry;
              Object.entries(value.data).forEach(entries => {
                var [index, contents] = entries;
                if (contents.user !== "AltaiW") {
                  uploads += Number(contents.upload)
                }
              })
              var dataDate = Date.parse(value.date);
              uploads = uploads / 1024
              uploads = uploads.toFixed(2)
              timeseries.push([dataDate, Number(uploads)])
            })
            res.send(timeseries).status(200)
          }
        })
})

app.get('/mi4cdownload', (req, res) => {
    Speed.find({ source:"MI-4C"}, (err, foundData) => {
        if (err) {
        console.log(err)
        } else {
            originalData = []
            console.log(foundData.length)
            const timeseries = [];
            var downloads = 0;
            Object.entries(foundData).forEach(entry => {
              var [key, value] = entry;
              Object.entries(value.data).forEach(entries => {
                var [index, contents] = entries;
                if (contents.user !== "AltaiW") {
                  downloads += Number(contents.download)
                }
              })
              var dataDate = Date.parse(value.date);
              downloads = downloads / 1024
              timeseries.push([dataDate, downloads.toFixed(2)])
            })
            res.send(timeseries).status(200)
          }
        })
})