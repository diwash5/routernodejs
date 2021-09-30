var userdata;
var timeseries;
function getdata() {
    fetch ('https://routernodejs-1.diwash5.repl.co/userusage')
        .then(response => response.json())
        .then (data => {
            userdata = data
            console.log(data)
        })
    }