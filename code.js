function barchart() {
fetch('https://DeepskyblueAlienatedDaemons.diwash5.repl.co/userusage')
    .then(response => response.json())
    .then(data => {
        const chart = Highcharts.chart('barchart', {
            chart: {
            type: 'bar'
            },
            title: {
                text: 'Total usage'
            },
            xAxis: {
                categories: data.user ,
    max:8,
    min:1,
    scrollbar: {
    enabled: true
                },
      },
            yAxis: {
                title: {
                    text: 'Data in GB'
                      },
                min:1,
                max:20,
                scrollbar: {
                    enabled: true
                }
            },
            plotOptions: {
                    series: {
                      stacking: 'normal'
                      }
                },
            series: [{
                name: 'Total Uploads',
                data: data.totaluploads
            }, {
                name: 'Total Downloads',
                data: data.totaldownloads }]
        });
    });
}
function linechart() {
fetch('https://DeepskyblueAlienatedDaemons.diwash5.repl.co/timeseries')
    .then(response => response.json())
    .then(data => {
Highcharts.chart('mi4alinechart', {

    title: {
        text: 'Time line of Data usage'
    },
    subtitle: {
        text: 'Source: Mi-4A'
    },

    yAxis: {
        title: {
            text: 'KB/S'
        }
    },
    xAxis: {
        categories: data.mi4adates ,
        scrollbar: {
          enabled: true
                },
        max:30
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    series: [{
        name: 'Download',
        data: data.mi4adownloads
    }, {
        name: 'Upload',
        data: data.mi4auploads
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
Highcharts.chart('mi4clinechart', {

    title: {
        text: 'Time line of Data usage'
    },

    subtitle: {
        text: 'Source: Mi-4C'
    },

    yAxis: {
        title: {
            text: 'KB/S'
        }
    },

    xAxis: {
        categories: data.mi4cdates ,
        scrollbar: {
          enabled: true
                },
        max:30
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    series: [{
        name: 'Download',
        data: data.mi4cdownloads
    }, {
        name: 'Upload',
        data: data.mi4cuploads
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
 })
}
