const myUsernames = [];
const myTotaldownloads = [];
const myTotaluploads = [];


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
            display: true,
            labels: {
                color: 'rgba(232, 232, 232, 1)'
            }
        }
    }
}
});
};

const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};