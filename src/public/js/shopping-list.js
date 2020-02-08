shoppingListHtml = "";
counter = 0;

function addListItem() {

    var add = document.getElementById('add-shopping-item');
    var save = document.getElementById('save-shopping-item');
    
    add.style.display = 'none';
    save.style.display = 'inline-block';

    var input = document.getElementById('shopping-input-container');
    input.style.display = 'inline-block';

    list.appendChild(shoppingItem);
}

function saveListItem() {
    var add = document.getElementById('add-shopping-item');
    var save = document.getElementById('save-shopping-item');

    var ingredient = document.getElementById('shopping-input').value;
    document.getElementById('shopping-input').value = "";

    if (ingredient.length > 0) {

    

        add.style.display = 'inline-block';
        save.style.display = 'none';
        shoppingItem = document.createElement('div');
        shoppingItem.classList.add('step-row');
        shoppingItem.innerHTML = `
        <div id="status-container-${counter}" class="status status-complete" onclick="tickStatus(${counter})">
        <div id="status-number-${counter}" class="status-number">${counter + 1}</div>
        <div id="status-tick-${counter}" class="status-tick hidden"><svg xmlns="http://www.w3.org/2000/svg" class="step-tick" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></div>
        </div>
        <div id="list-item-${counter}" class="shopping-description">${ingredient}</div>`

        var input = document.getElementById('shopping-input-container');
        input.style.display = 'none';
        // shoppingItem.addEventListener('click', tickStatus);

        counter ++;

        var list = document.getElementById('shopping-list-container');

        list.appendChild(shoppingItem);
    }
}

function tickStatus(number) {
    if (document.getElementById(`status-container-${number}`).classList.contains('ticked')) {
        untick(number);
    } else {
        tick(number)
    }
}

function tick(number) {

    document.getElementById(`status-container-${number}`).classList.add('ticked');
    document.getElementById(`status-number-${number}`).style.display = 'none';
    document.getElementById(`status-tick-${number}`).style.display = 'inline-block';
    document.getElementById(`list-item-${number}`).classList.add('description-complete');
}

function untick(number){
    document.getElementById(`status-container-${number}`).classList.remove('ticked');
    document.getElementById(`status-number-${number}`).style.display = 'inline-block';
    document.getElementById(`status-tick-${number}`).style.display = 'none';
    document.getElementById(`list-item-${number}`).classList.remove('description-complete');
}


