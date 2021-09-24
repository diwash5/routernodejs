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
    data: {
    labels: myUsernames,
    datasets: [{
        label: 'Downloads',
        data: myTotaldownloads,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)'
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
    }
}
});
};
