
// 1 - Создать таблицу со списком криптовалют
// 2 - в ней будет отображаться : наименование , курс ,  обновление, график, тенденция роста, соотношение
// 3 - при клике на валюту у нас будет расскрываться дополнительный функционал

// const currencyList = 'https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=60&aggregate=1';
// function request (link) {
//
//     // параметр link задается чтоб вместо него можно было подставлять другие аргументы для функции реквест
//     fetch(link, {
//
//     })
//         .then( function (response) {
//             return response.json()
//         })
//         .then(function (data) {
//             console.log(data.Data);
//
//             let timeArr = data.Data.map(function (min) {
//                 return moment(min.time).format('LTS')
//             });
//             let priceArr = data.Data.map(function (price) {
//                 return price.open
//             });
//             let chartData = {};
//             chartData.time = timeArr;
//             chartData.price = priceArr;
//             // console.log(chartData);
//             return chartData;
//         })
//         .then(function (item) {
//             var ctx = document.getElementById('myChart').getContext('2d');
//             var chart = new Chart(ctx, {
//                 // The type of chart we want to create
//                 type: 'line',
//
//                 // The data for our dataset
//                 data: {
//                     labels: item.time,
//                     datasets: [{
//                         label: "My First dataset",
//                         backgroundColor: 'rgb(255, 99, 132)',
//                         borderColor: 'rgb(255, 99, 132)',
//                         data: item.price,
//                     }]
//                 },
//
//                 // Configuration options go here
//                 options: {}
//             });
//         })
//     console.log(moment(1520865621).format('LT'));
//
//
//
// }
// request(currencyList)
//https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=BTC&limit=60&aggregate=1&toTs=1452680400&extraParams=your_app_name


let input = document.createElement('input');
let but = document.createElement('a');
let butClean = document.createElement('a');
let butHour = document.createElement('a');
let butDay = document.createElement('a');
let cloud = document.createElement('i');
let fragg = document.createDocumentFragment();
let informBlock = document.createElement('div');



//select directory
let container = document.querySelector('.container-grap');


//classes

but.classList.add('waves-effect', 'waves-light', 'btn','cli');
butClean.classList.add('waves-effect', 'waves-light', 'btn','cli');
butHour.classList.add('waves-effect', 'waves-light', 'btn','cli');
butDay.classList.add('waves-effect', 'waves-light', 'btn','cli');


cloud.classList.add('material-icons', 'left');



//input text

but.textContent = 'minute';
butClean.textContent = 'refresh';
cloud.textContent = 'cloud';
butHour.textContent = 'hour';
butDay.textContent = 'day';

//put in
container.append(informBlock);
// informBlock.append(input);
informBlock.append(butClean);
informBlock.append(but);
informBlock.append(butHour);
informBlock.append(butDay);
but.append(cloud);
container.append(fragg);
let grapClass = document.querySelector('.grap');

let enterPoint = 'https://min-api.cryptocompare.com/data/histominute?fsym=';
let enterPointHour = 'https://min-api.cryptocompare.com/data/histohour?fsym=';
let enterPointDay = 'https://min-api.cryptocompare.com/data/histoday?fsym='
// const currencyList = 'https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=1';
function request (link) {

    // параметр link задается чтоб вместо него можно было подставлять другие аргументы для функции реквест
    fetch(link, {

    })
        .then( function (response) {
            return response.json()
        })
        .then(function (data) {         // name
            console.log(data.Data);

            let timeArr = data.Data.map(function (min) {
                return moment.unix(min.time).format("LL");
            });
            let priceArr = data.Data.map(function (price) {
                return price.open
            });
            let chartData = {};
            chartData.time = timeArr;
            chartData.price = priceArr;
            // console.log(chartData);
            console.log();

            return chartData;
        })
        .then(function (item) {
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: item.time,
                    datasets: [{
                        label: "price",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: item.price,
                    }]
                },

                // Configuration options go here
                options: {}
            });
        })

}



// butClean.addEventListener('click', refresh);
// function refresh() {
//     chart.data.labels.pop(item.time);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.pop(item.price);
//     });
//     chart.update()
// }

but.addEventListener('click', function () {
    even(ask2);
});
// grapClass.innerHTML='';
// let canvasElem = document.createElement('canvas');
// canvasElem.setAttribute('id','myChart');
// grapClass.append(canvasElem);
function even(id) {
    // let crypt = document.querySelector('input');
    // console.log(crypt);
    // console.log(crypt.value);
    // let ask = crypt.value.toUpperCase();
    // fetch(enterPoint+ask+'&tsym=USD&limit=60&aggregate=1')
    fetch(enterPoint+id+'&tsym=USD&limit=60&aggregate=1')
        .then (function (response) {
            return response.json();
        })
        .then (function (data) {
            let timeArr = data.Data.map(function (min) {
                return moment.unix(min.time).format("LLLL");
            });
            let priceArr = data.Data.map(function (price) {
                return price.open
            });
            let chartData = {};
            chartData.time = timeArr;
            chartData.price = priceArr;
            // console.log(chartData);
            console.log();

            return chartData;
        })
        .then(function (item) {
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: item.time,
                    datasets: [{
                        label: "price",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: item.price,
                    }]
                },


                // Configuration options go here
                options: {}
            });

            butClean.addEventListener('click', function () {
                    console.log('test');
                    chart.clear();
                });

            // butClean.addEventListener('click', function () {
            //     console.log('test');
            //     removeData(chart)
            // });

        })
}
butHour.addEventListener('click', function () {
    hour(ask2);
});
function hour(id) {
    // let crypt = document.querySelector('input');
    // console.log(crypt);
    // console.log(crypt.value);
    // let ask = crypt.value.toUpperCase();
    // fetch(enterPointHour+ask+'&tsym=USD&limit=24&aggregate=1')
    fetch(enterPointHour+id+'&tsym=USD&limit=24&aggregate=1')
        .then (function (response) {
            return response.json();
        })
        .then (function (data) {
            let timeArr = data.Data.map(function (min) {
                return moment.unix(min.time).format("LLLL");
            });
            let priceArr = data.Data.map(function (price) {
                return price.open
            });
            let chartData = {};
            chartData.time = timeArr;
            chartData.price = priceArr;
            // console.log(chartData);
            console.log();

            return chartData;
        })
        .then(function (item) {
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: item.time,
                    datasets: [{
                        label: "price",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: item.price,
                    }]
                },


                // Configuration options go here
                options: {}
            });
            butClean.addEventListener('click', function () {
                console.log('test');
                console.log(chart);
                removeData(chart)
            });

        })
}
butDay.addEventListener('click', function () {
    day(ask2);
});
function day(id) {
    // let crypt = document.querySelector('input');
    // console.log(crypt);
    // console.log(crypt.value);
    // let ask = crypt.value.toUpperCase();
    // fetch(enterPointDay+ask+'&tsym=USD&limit=30&aggregate=1')
    fetch(enterPointDay+id+'&tsym=USD&limit=30&aggregate=1')
        .then (function (response) {
            return response.json();
        })
        .then (function (data) {
            let timeArr = data.Data.map(function (min) {
                return moment.unix(min.time).format("LLLL");
            });
            let priceArr = data.Data.map(function (price) {
                return price.open
            });
            let chartData = {};
            chartData.time = timeArr;
            chartData.price = priceArr;
            // console.log(chartData);
            console.log();

            return chartData;
        })
        .then(function (item) {
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: item.time,
                    datasets: [{
                        label: "price",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: item.price,
                    }]
                },


                // Configuration options go here
                options: {}
            });
            butClean.addEventListener('click', function () {
                console.log('test');
                removeData(chart)
            });

        })
}



console.log(moment().format());



// request(currencyList)

























function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels = [];
    console.log(chart.data.labels);
    chart.data.datasets = [];
    chart.update();
}



