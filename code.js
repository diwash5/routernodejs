const myUsernames = [];
const myTotaldownloads = [];
const myTotaluploads = [];
const datedata = [ ];
const uploaddata = [ ];
const downloaddata = [ ];

function getdata() {
    fetch('https://DeepskyblueAlienatedDaemons.diwash5.repl.co/data')
        .then(response => response.json())
        .then(data => {
            for (const [name, valuedatas ] of Object.entries(data) ) {
                let usernames = name
                let totaldataaaas = valuedatas.totaldownloads
                let totaluploaddds = valuedatas.totaluploads
                myUsernames.push(usernames)
                myTotaldownloads.push(totaldataaaas)
                myTotaluploads.push(totaluploaddds)
              }
              fuknhell()
                        }
        );
};

function datetimechart() {
  fetch('https://DeepskyblueAlienatedDaemons.diwash5.repl.co/rawdata')
    .then(response => response.json())
    .then(data => {
    Object.entries(data).forEach(entry =>{
    var [key,value] = entry;
    if ( value.user !== 'AltaiW' ) {
    datedata.push(value.createdAt);
    uploaddata.push(value.upload / 1024);
    downloaddata.push(value.download / 1024 ); }
    });
    chartmeplease()},    
    )
}

function fuknhell() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    plugins: [plugin],
    data: {
    labels: myUsernames,
    datasets: [{
        label: 'Download',
        data: myTotaldownloads,
        backgroundColor: [
            'rgba(255, 99, 132, 3)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 5)'
        ],
        borderWidth: 1
    },
    {
        label: 'Upload',
        data: myTotaluploads,
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
    }]
},
options: {
    indexAxis: 'y',
    scales: {
        x: {
            stacked: true,
            beginAtZero: true
        },
        y: {
          stacked: true
        }
    },
    plugins: {
        legend: {
            display: false,
            labels: {
                color: 'rgba(232, 232, 232, 1)'
            }
        }
    }
}
});
};
function chartmeplease() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: datedata,
    datasets: [{
        label: 'Download (KB/S)',
        data: downloaddata ,
        borderColor: 'red',
        fill: false,
        tension: 1,
        rtl : true
    },
    {
        label: 'Upload (KB/S) ',
        data: uploaddata,
        borderColor: 'blue' ,
        borderWidth: 1,
        radius: 0
    }],
    options: {
        scales: {
            x: {
                ,
            }
        }
    }
}});};

const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
