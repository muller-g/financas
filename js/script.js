/* var */
var items = []
var id = 0;

/* clear fields */
function clearFields(){
    let description = document.querySelector('#description');
    let value = document.querySelector('#value');
    let date = document.querySelector('#date');
    description.value = '';
    value.value = '';
    date.value = '';
}

/* validate fields */
function validateFields(){
    let description = document.querySelector('#description').value;
    let value = document.querySelector('#value').value;
    let date = document.querySelector('#date').value;
    let valid = null;
    if(description != '' && value != '' && date != ''){
        valid = true;
    } else {
        valid = false;
    }
    return valid;
}

/* modal */
var modal = document.querySelector('.modal');
var addTransact = document.querySelector('.add-transact');
var closeModal = document.querySelector('.close-modal');

addTransact.addEventListener('click', ()=> {
    modal.classList.toggle('off');
})

closeModal.addEventListener('click', ()=> {
    modal.classList.toggle('off');
    clearFields();
})

/* add Transact */
var saveTransact = document.querySelector('.save-transact');

saveTransact.addEventListener('click', ()=> {
    let list = document.querySelector('.list-value');
    let li = document.createElement('li');
    let descriptionDiv = document.createElement('div');
    let idDiv = document.createElement('div');
    let priceDiv = document.createElement('div');
    let dataDiv = document.createElement('div');
    let aImg = document.createElement('a');
    let img = document.createElement('img');
    let description = document.querySelector('#description').value;
    let value = document.querySelector('#value').value;
    let date = document.querySelector('#date').value;
    let radio = document.querySelector('input[name="opt"]:checked').value;

    descriptionDiv.classList.add('description');
    priceDiv.classList.add('price');
    dataDiv.classList.add('data');
    aImg.classList.add('remove');
    idDiv.classList.add('id');
    img.src = 'img/delete.svg';

    if(radio == "out"){
        priceDiv.style.color = 'red';
    }

    list.appendChild(li);
    li.appendChild(idDiv);
    idDiv.innerHTML = id;
    li.appendChild(descriptionDiv);
    descriptionDiv.innerHTML = description;
    li.appendChild(priceDiv);
    priceDiv.innerHTML = 'R$ ' + value;
    li.appendChild(dataDiv);
    dataDiv.innerHTML = date;
    li.appendChild(aImg);
    aImg.appendChild(img);  

    items.push({
        localId: id,
        localDescription: description,
        localValue: value,
        localDate: date,
        localRadio: radio,
    });

    localStorage.setItem('user', JSON.stringify(items));
    
    id++;

    /* remove item */
    aImg.addEventListener('click', removeItem);

    populateIncome();
    clearFields();
})

/* populate list */
function populateList(){
    if(JSON.parse(localStorage.getItem('user')) != null){
        JSON.parse(localStorage.getItem('user')).forEach(items => {
            let list = document.querySelector('.list-value');
            let li = document.createElement('li');
            let idDiv = document.createElement('div');
            let descriptionDiv = document.createElement('div');
            let priceDiv = document.createElement('div');
            let dataDiv = document.createElement('div');
            let aImg = document.createElement('a');
            let img = document.createElement('img');

            descriptionDiv.classList.add('description');
            priceDiv.classList.add('price');
            dataDiv.classList.add('data');
            aImg.classList.add('remove');
            idDiv.classList.add('id');
            img.src = 'img/delete.svg';

            if(items.localRadio == "out"){
                priceDiv.style.color = 'red';
            }

            list.appendChild(li);
            li.appendChild(idDiv);
            idDiv.innerHTML = items.localId;
            li.appendChild(descriptionDiv);
            descriptionDiv.innerHTML = items.localDescription;
            li.appendChild(priceDiv);
            priceDiv.innerHTML = 'R$ ' + items.localValue;
            li.appendChild(dataDiv);
            dataDiv.innerHTML = items.localDate;
            li.appendChild(aImg);
            aImg.appendChild(img); 
            
            /* remove item */
            aImg.addEventListener('click', removeItem);
        
        });
    }
}

/* amount fields */
function populateIncome(){
    let incomesField = document.getElementById('incomes');
    let expensesField = document.getElementById('expenses');
    let moneyField = document.getElementById('money');
    let totalIncomes = 0;
    let totalExpenses = 0;

    if(JSON.parse(localStorage.getItem('user')) != null){
        JSON.parse(localStorage.getItem('user')).forEach(items => {
            if(items.localRadio == 'in'){
                totalIncomes += parseFloat(items.localValue);
            }   
            if(items.localRadio == 'out'){
                totalExpenses += parseFloat(items.localValue);
            }   
        });
    }
    incomesField.innerHTML = 'R$ ' + totalIncomes;
    expensesField.innerHTML = '- R$ ' + totalExpenses;
    moneyField.innerHTML = 'R$ ' + (totalIncomes - totalExpenses);
}

/* clear list */
var clearBtn = document.querySelector('.clear-transact');
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    let list = document.querySelector('.list-value');
    list.innerHTML = '';
    items = [];
    populateIncome();
    populateList();
    id = 0;
})

/* remove item func */
function removeItem(e){
    let selectedItem;
    selectedItem = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    let getLocalStorage = JSON.parse(localStorage.getItem('user'));
    for(let i=0; i<=getLocalStorage.length; i++){
        if(getLocalStorage[i].localId == parseInt(selectedItem)){
            getLocalStorage.splice(selectedItem, 1);
        }  
    }
    localStorage.setItem('user', JSON.stringify(getLocalStorage));
    populateIncome();
    location.reload();
}

populateIncome();
populateList();