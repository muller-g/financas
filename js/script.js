/* modal */
var modal = document.querySelector('.modal');
var addTransact = document.querySelector('.add-transact');
var closeModal = document.querySelector('.close-modal');

addTransact.addEventListener('click', ()=> {
    modal.classList.toggle('off');
})

closeModal.addEventListener('click', ()=> {
    modal.classList.toggle('off');
})

/* add Transact */
var saveTransact = document.querySelector('.save-transact');

saveTransact.addEventListener('click', ()=> {
    var list = document.querySelector('.list-value');
    var li = document.createElement('li');
    var descriptionDiv = document.createElement('div');
    var priceDiv = document.createElement('div');
    var dataDiv = document.createElement('div');
    var removeDiv = document.createElement('div');
    var aImg = document.createElement('a');
    var img = document.createElement('img');
    var description = document.querySelector('#description').value;
    var value = document.querySelector('#value').value;
    var date = document.querySelector('#date').value;
    var radio = document.querySelector('input[name="opt"]:checked').value;

    descriptionDiv.classList.add('description');
    priceDiv.classList.add('price');
    dataDiv.classList.add('data');
    removeDiv.classList.add('remove');
    img.src = 'img/delete.svg';

    if(radio == "out"){
        priceDiv.style.color = 'red';
    }

    list.appendChild(li);
    li.appendChild(descriptionDiv);
    descriptionDiv.innerHTML = description;
    li.appendChild(priceDiv);
    priceDiv.innerHTML = 'R$ ' + value;
    li.appendChild(dataDiv);
    dataDiv.innerHTML = date;
    li.appendChild(removeDiv);
    removeDiv.appendChild(aImg);
    aImg.appendChild(img);  
})



