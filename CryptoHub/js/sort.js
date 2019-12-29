// const currencyList = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';

//
// const btn = document.querySelector('#btn-sort-max');
// btn.addEventListener('click', function(){
//     max(currencyList);
// });
//
// const alph = document.querySelector ('#btn-sort-alph');
// alph.addEventListener('click', function(){
//     sort(currencyList);
// });
//
// const val = document.querySelector ('#btn-sort-min');
// val.addEventListener('click', function(){
//     min(currencyList);
// });
// const value = document.querySelector ('#btn-sort-day');
// value.addEventListener('click', function(){
//     console.log('test');
//     day(currencyList);
// });
//
// const vall = document.querySelector ('#btn-sort-hour');
// vall.addEventListener('click', function(){
//     hour(currencyList);
// });




function hour(data){
            return data.sort(function (a, b) {
                return b.percent_change_1h - a.percent_change_1h;
            });
        }

function day(data){
    return data.sort(function (a, b) {
                return b.percent_change_24h - a.percent_change_24h;
                });
        }

function max(data){
            return data.sort(function (a, b) {
                return a.price_usd -b.price_usd;
            });
}
function min(data){
            return data.sort(function (a, b) {
                return  b.price_usd - a.price_usd;
            });
        }
function sort(data){
            return data.sort(function (a, b) {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
             });

        }

function rank1(data){
    return data.sort(function (a, b) {
        return  a.rank - b.rank;
    });

}

$(document).ready(function() {
    $('select').material_select();
});

$(".button-collapse").sideNav();
