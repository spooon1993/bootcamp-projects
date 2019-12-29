let but = document.createElement('a');
let butHour = document.createElement('a');
let butDay = document.createElement('a');
let cloud = document.createElement('i');
let fragg = document.createDocumentFragment();
let informBlock = document.createElement('div');
//select directory
let container = document.querySelector('.container-grap');
//classes
but.classList.add('waves-effect', 'waves-light', 'btn','cli');
butHour.classList.add('waves-effect', 'waves-light', 'btn','cli');
butDay.classList.add('waves-effect', 'waves-light', 'btn','cli');
cloud.classList.add('material-icons', 'left');
//input text
but.textContent = 'Last 1h';
// cloud.textContent = 'cloud';
butHour.textContent = 'Last 24h';
butDay.textContent = 'Last 30d';
//put in
container.append(informBlock);
informBlock.append(but);
informBlock.append(butHour);
informBlock.append(butDay);
but.append(cloud);
container.append(fragg);
// const currencyList = 'https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=1';

let id;
// let ask2;
function graphUpdate(chart, id, time, limit, formatTime) {
    graphResponse(id, time, limit, formatTime)
        .then(function (data) {
            console.log('data update',data);
            chart.data.labels = data.time;
            chart.data.datasets.forEach((dataset) => {
                dataset.data = data.price;
            });
            chart.update();
        });
}
function graphResponse(id, time, limit, formatTime) {
    console.log('time',time);
    return fetch(`https://min-api.cryptocompare.com/data/${time}?fsym=${id.toUpperCase()}&tsym=USD&limit=${limit}&aggregate=1`)
        .then (function (response) {
            return response.json();
        })
        .then (function (data) {
            let timeArr = data.Data.map(function (min) {
                return moment.unix(min.time).format(formatTime);
            });
            let priceArr = data.Data.map(function (price) {
                return price.open
            });
            let chartData = {};
            chartData.time = timeArr;
            chartData.price = priceArr;
            return chartData;
        })
}
// var c = document.getElementById('myChart');
// var canvas = c.getContext('2d');
function graphOnOpen(id,time, limit, formatTime) {
    graphResponse(id, time, limit, formatTime)
        .then(function (data) {
            return data
        })
        .then(function (item) {
            var ctx = document.getElementById('myChart').getContext('2d');
            chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',
                // The data for our dataset
                data: {
                    labels: item.time,
                    datasets: [{
                        label: "price USD",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: item.price,
                    }]
                },
                // Configuration options go here
                options: {}
            });
            return chart
        })
        .then(function (chart) {
            but.addEventListener('click', function () {
                graphUpdate(chart, id, 'histominute', 60, 'HH:mm:ss')
            });
            butHour.addEventListener('click', function () {
                graphUpdate(chart, id, 'histohour', 24, 'D.MM | HH:mm')
            });
            butDay.addEventListener('click', function () {
                graphUpdate(chart, id, 'histoday','30', 'DD.MM.YYYY')
            });
        })
}
// graphOnOpen(id, 'histohour', 24, 'D.MM | HH:mm');
