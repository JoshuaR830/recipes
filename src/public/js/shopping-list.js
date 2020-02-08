shoppingListHtml = "";
counter = 0;
var shoppingItemList = [];
var ticked = [];

function OnShoppingListLoaded() {
    shoppingItemList = [];
    getShoppingList()
}

function addListItem() {
    var add = document.getElementById('add-shopping-item');
    var save = document.getElementById('save-shopping-item');
    
    add.style.display = 'none';
    save.style.display = 'inline-block';

    var input = document.getElementById('shopping-input-container');
    input.style.display = 'inline-block';
    document.getElementById('shopping-input').focus();
}

function saveListItem() {
    var add = document.getElementById('add-shopping-item');
    var save = document.getElementById('save-shopping-item');

    var listItem = document.getElementById('shopping-input').value;
    document.getElementById('shopping-input').value = "";
    add.style.display = 'inline-block';
    save.style.display = 'none';
    
    if (listItem.length > 0) {
        displayListItem(listItem);
    }

    var input = document.getElementById('shopping-input-container');
    input.style.display = 'none';
    ticked.push(0);
    putShoppingList();
}

function deleteListItem(number) {
    shoppingItemList.splice(number, 1);
    ticked.splice(number, 1);
    putShoppingList();
}

function displayListItem(listItem){
    shoppingItemList.push(listItem);
    shoppingItem = document.createElement('div');
    shoppingItem.classList.add('step-row');
    shoppingItem.innerHTML = `
    <div id="status-container-${counter}" class="status status-complete" onclick="tickStatus(${counter})" oncontextmenu="showDeleteButton(${counter})">
    <div id="status-number-${counter}" class="status-number">${counter + 1}</div>
    <div id="status-tick-${counter}" class="status-tick hidden"><svg xmlns="http://www.w3.org/2000/svg" class="step-tick" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></div>
    </div>
    <div id="list-item-${counter}" class="shopping-description">${listItem}</div>`
    counter ++;
    var list = document.getElementById('shopping-list-container');

    list.appendChild(shoppingItem);
}

function showDeleteButton(number) {
    console.log("DELETE");
    // Render a delete button
    // When that button is clicked delete
}

function tickStatus(number) {
    if (document.getElementById(`status-container-${number}`).classList.contains('ticked')) {
        untick(number);
        ticked[number] = 0;
    } else {
        tick(number)
        ticked[number] = 1;
    }
    putShoppingList();
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

function renderShoppingList(listData) {
    console.log("UserId: ", listData.UserId);
    console.log("Data: ", listData.ShoppingList);
    ticked = listData.Ticked;
    console.log("Ticked: ", ticked)
    for (var item of listData.ShoppingList) {
        console.log(item);
        if(item.length > 0) {
            displayListItem(item);
        }
    }

    console.log("Ticked", listData.Ticked);

    for (var i = 0; i < listData.Ticked.length; i++)
    {
        if (listData.Ticked[i] === 0) {
            untick(i)
        } else {
            tick(i)
        }
    }
}

function getShoppingList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            recipeIds = response;
            console.log(JSON.parse(response));
            console.log(typeof JSON.parse(response));
            renderShoppingList(JSON.parse(response));
        }
    };

    xhttp.open("GET", `http://${hostname}/api/shoppingList`);
    xhttp.send();
}

function putShoppingList() {
    var xhttp = new XMLHttpRequest();
    // Needs an ID - used for updating
    xhttp.open("PUT", `http://${hostname}/api/shoppingList/b645d320-ae7f-42b6-acf6-5af52693ffa6`);
    var data = {};
    data.userId = "b645d320-ae7f-42b6-acf6-5af52693ffa6";
    data.shoppingList = shoppingItemList;
    console.log(ticked);
    data.ticked = ticked;

    var json = JSON.stringify(data);

    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Success");
        }
    }
    xhttp.send(json);
}