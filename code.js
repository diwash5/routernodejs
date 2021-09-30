function getdata() {
    fetch ('https://routernodejs-1.diwash5.repl.co/userusage')
        .then(response => response.json())
        .then (data => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    plugins: [plugin],
    data: {
    labels: data.user ,
    datasets: [{
        label: 'Download',
        data: data.totaldownloads,
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
        data: data.totaluploads,
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
    }
    }
    });
        })

}

function timeseries() {
    fetch ('https://routernodejs-1.diwash5.repl.co/timeseries')
        .then(response => response.json())
        .then (data => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    plugins: [plugin],
    data: {
    labels: data.datedata ,
    datasets: [{
        label: 'Download',
        data: data.downloaddata,
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
        data: data.uploaddata,
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
        borderColor: [
            'rgba(54, 162, 235, 1)'
            ],
        borderWidth: 1
            }]
    }
    });
        })

}
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