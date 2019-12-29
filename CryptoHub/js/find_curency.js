// //yura
let conteiner = document.querySelector('.input-cryptocurrency');
let inputCurency = document.createElement('input');
let btnInput = document.createElement('a');
//
// class
inputCurency.classList.add("validate");
btnInput.classList.add('waves-effect', 'waves-light', 'btn','cryptocurrency');
btnInput.textContent = 'find cryptocurrency';

conteiner.append(inputCurency);
conteiner.append(btnInput);
//yura

// find
function find() {
    fetch(currencyList)
        .then( function (responce) {
            return responce.json();
        })
        .then(function (data) {
            let inputToLover = inputCurency.value.toLowerCase();
            let rezolt  = data.filter(function (temp) {
                if(inputToLover === temp.id.toLowerCase() || inputToLover ===  temp.symbol.toLowerCase()  ){
                    return  temp;
                }
            });
            createCard(rezolt);
        })

}
btnInput.addEventListener('click',function () {

    find();
});
//find
