// // //yura
// let conteiner = document.querySelector('.input-cryptocurrency');
// let inputCurency = document.createElement('input');
// let btnInput = document.createElement('a');
// //
// //
// // // class
// inputCurency.classList.add("validate");
// btnInput.classList.add('waves-effect', 'waves-light', 'btn','cryptocurrency');
// btnInput.textContent = 'find cryptocurrency';
//
// conteiner.append(inputCurency);
// conteiner.append(btnInput);
// // //yura create function
//
//
// //yura
//
// ///yura

// const currencylist = 'https://api.coinmarketcap.com/v1/ticker/?limit=15';
// let box = document.querySelector('.box');
let img = 'https://bitflyer.blob.core.windows.net/pub/Images/bitcoin-logo.png';
let arrowUp = '<i class="tiny material-icons up">arrow_upward</i>';
let arrowDown = '<i class="tiny material-icons down">arrow_downward</i>';
let arrow1h = '';
let arrow24h = '';
let arrow7d = '';

// $(document).ready(function(){
//     // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
//     $('.modal').modal();
// });



// function requst() {
//     fetch(currencylist)
//         .then(function (response) {
//            return response.json()
//         })
//
//         .then(function (data) {
//
//             console.log(data);
//             let string = '';
//             for (let i = 0; i < data.length; i ++){

const currencyList = 'https://api.coinmarketcap.com/v1/ticker/?limit=30';
let box = document.querySelector('.box');
let btcicon = 'http://bitcoin-4k.com/wp-content/uploads/2017/06/btc.png';
const btn = document.querySelector('#btn-sort-max');
const alph = document.querySelector ('#btn-sort-alph');
const val = document.querySelector ('#btn-sort-min');
const value = document.querySelector ('#btn-sort-day');
const vall = document.querySelector ('#btn-sort-hour');
const rank = document.querySelector ('#btn-sort-rank');



function createCard(data) {
    let string = '';


    for ( let i = 0; i < data.length; i++ ) {
        if(data[i].percent_change_1h > 0){
            arrow1h = arrowUp;
        }
        else{
            arrow1h = arrowDown;
        }

        if(data[i].percent_change_24h > 0){
            arrow24h = arrowUp;
        }
        else{
            arrow24h = arrowDown;
        }
        if(data[i].percent_change_7d > 0){
            arrow7d = arrowUp;
        }
        else{
            arrow7d = arrowDown;
        }

        string += `<div class="card"> <div class="card-image"><img src=img/${data[i].id}.png><span class="card-title"> ${data[i].name} </span> <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" id="${data[i].symbol}"><i class="material-icons">add</i></a> </div>  <div class="card-content"> <p>rank: ${data[i].rank}</p> <p> ${data[i].symbol}: ${data[i].price_usd} USD</p> <h5 class="card-sub-title">Change</h5> <div class="change-box"> <p class="change-item">1h: ${data[i].percent_change_1h}: ${arrow1h}</p> <p class="change-item">24h: ${data[i].percent_change_24h}: ${arrow24h}</p> <p class="change-item">7d: ${data[i].percent_change_7d}: ${arrow7d}</p> </div> </div> </div> `;
    }
    box.innerHTML = string;
}
function request(link) {
    fetch(link)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            createCard(data);
            return data;
        })
        .then(function (data2) {
            btn.addEventListener('click', function(){
                createCard(max(data2));
            });
            alph.addEventListener('click', function(){
                createCard(sort(data2));
            });
            val.addEventListener('click', function() {
                createCard(min(data2));
            });
            value.addEventListener('click', function(){
                createCard(day(data2));
            });
            vall.addEventListener('click', function(){
                createCard(hour(data2));
            });
            rank.addEventListener('click', function(){
                createCard(rank1(data2));
            });

        });
}
request(currencyList);
// // find
//                 function find() {
//                     fetch(currencyList)
//                         .then( function (responce) {
//                             return responce.json();
//                         })
//                         .then(function (data) {
//                            let inputToLover = inputCurency.value.toLowerCase();
//                             let rezolt  = data.filter(function (temp) {
//                                 if(inputToLover === temp.id.toLowerCase() || inputToLover ===  temp.symbol.toLowerCase()  ){
//                                     return  temp;
//                                 }
//                             });
//                             createCard(rezolt);
//                         })
//
//                 }
//                 btnInput.addEventListener('click',function () {
//
//                     find();
//                 });
// //find


$('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            // alert("Ready");
            // console.log(modal, trigger);
            let grap = document.querySelector('.grap');
            grap.innerHTML = `<canvas id="myChart"></canvas>`;
            id = trigger[0].id;
            graphOnOpen(id, 'histohour', 24, 'D.MM | HH:mm');
            let modHead = document.querySelector('.modal-title');
            modHead.textContent = id;
            console.log(trigger[0].id);

        },
        complete: function() {
            // alert('Closed');
        } // Callback for Modal close
    }
);
//
//
// let ask2;
//
//
//                 // console.log(arrow24);
//                 string +=`<div class="card"> <div class="card-image"> <img src="${img}">
// <a href="#modal1" class="btn-floating halfway-fab waves-effect waves-light red waves-effect waves-light btn modal-trigger" ><i class="material-icons">add</i></a>
// <p> ${data[i].name}:</p> ${data[i].price_usd} usd:<p> rank: ${data[i].rank}</p><div class="card-content"> <h4>Changes</h4> <p>1h: ${data[i].percent_change_1h}:  </p>  <p>24h: ${data[i].percent_change_24h}:  </p><p>7d: ${data[i].percent_change_7d}: </p></div></div></div>`;
//             }
//             box.innerHTML = string;
//
//         })
// }
//
// requst();