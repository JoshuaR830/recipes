shoppingListHtml = "";
counter = 0;
var shoppingItemList = [];
var ticked = [];

function OnShoppingListLoaded() {
    shoppingItemList = [];

    
    document.getElementById('shopping-list-reveal').style.display = 'none';
    document.getElementById('recipe-list-reveal').style.display = 'inline-block';
    document.getElementById('delete-shopping-item').style.display = 'inline-block';
    document.getElementById('calendar-reveal').style.display = 'inline-block';
    document.getElementById('account-switcher').style.display = 'none';
    
    getShoppingList();
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
    document.getElementById('shopping-list-item-container').classList.remove('delete');
    document.getElementById('show-delete').style.display = "inline-block";
    document.getElementById('hide-delete').style.display = "none";
    changeListCompleteIcon();
    if (listItem.length > 0) {
        displayListItem(listItem);
    }

    var input = document.getElementById('shopping-input-container');
    input.style.display = 'none';
    ticked.push(0);
    putShoppingList();
}

function deleteListItem(number) {
    console.log("Delete");
    shoppingItemList.splice(number, 1);
    ticked.splice(number, 1);
    putShoppingList();
}

function displayListItem(listItem){
    shoppingItemList.push(listItem);
    shoppingItem = document.createElement('div');
    shoppingItem.classList.add('step-row');
    var num = counter;
    shoppingItem.addEventListener('click', function() {
        tickStatus(num);
    });

    var toDelete = document.getElementById('shopping-list-item-container').classList.contains('delete');
    console.log(`${toDelete ? "": "hidden"}`);
    shoppingItem.innerHTML = `
    <div id="deletion-container-${counter}" class="status ${toDelete ? "": "hidden"} status-complete delete-me" oncontextmenu="showDeleteButton(${counter})">
        <div id="status-delete-${counter}" class="status-tick"><svg xmlns="http://www.w3.org/2000/svg" class="step-tick" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"/></svg></div>
    </div>
    <div id="status-container-${counter}" class="status status-complete check-me ${toDelete ? "hidden": ""}" oncontextmenu="showDeleteButton(${counter})">
    <div id="status-number-${counter}" class="status-number">${counter + 1}</div>
    <div id="status-tick-${counter}" class="status-tick hidden"><svg xmlns="http://www.w3.org/2000/svg" class="step-tick" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></div>
    </div>
    <div id="list-item-${counter}" class="shopping-description">${listItem}</div>`
    counter ++;
    var list = document.getElementById('shopping-list-item-container');

    list.appendChild(shoppingItem);
}

function showDeleteButton(number) {
    console.log("DELETE");
    // Render a delete button
    // When that button is clicked delete
}

function tickStatus(number) {
    console.log(number);
    var list = document.getElementById('shopping-list-item-container');

    if (list.classList.contains('delete')) {
        deleteListItem(number);
    }
    else if (document.getElementById(`status-container-${number}`).classList.contains('ticked')) {
        untick(number);
        ticked[number] = 0;
    } else {
        tick(number)
        ticked[number] = 1;
    }
    putShoppingList();
}

function toggleItemDeletion() {
    var list = document.getElementById('shopping-list-item-container');
    if (list.classList.contains('delete'))
    {
        list.classList.remove('delete');
        document.getElementById('show-delete').style.display = "inline-block";
        document.getElementById('hide-delete').style.display = "none";
        changeListCompleteIcon()
    } else {
        list.classList.add('delete');
        document.getElementById('show-delete').style.display = "none";
        document.getElementById('hide-delete').style.display = "inline-block";
        changeListCompleteIcon()
    }
}

function changeListCompleteIcon() {
    var list = document.getElementById('shopping-list-item-container');
    checks = document.querySelectorAll('.check-me');
    deletes = document.querySelectorAll('.delete-me');

    console.log(list.classList.contains('delete'));

    if (list.classList.contains('delete')) {
        console.log('delete');
        checks.forEach(function(status) {
            status.style.display = 'none';
        });
        deletes.forEach(function(status) {
            status.style.display = 'inline-block';
        });
    } else {
        console.log('dont delete');
        checks.forEach(function(status) {
            status.style.display = 'inline-block'
        });
        deletes.forEach(function(status) {
            status.style.display = 'none'
        });
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

function renderShoppingList(listData) {
    console.log("UserId: ", listData.UserId);
    console.log("Data: ", listData.ShoppingList);
    ticked = listData.Ticked;
    console.log("Ticked: ", ticked)
    var list = document.getElementById('shopping-list-item-container');
    list.innerHTML = "";
    shoppingItemList = [];
    counter = 0;
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

    var id = getCookie("recipeUserId");
    xhttp.open("GET", `http://${hostname}/api/shoppingList/${id}`);
    xhttp.send();
}

function putShoppingList() {
    var xhttp = new XMLHttpRequest();
    // Needs an ID - used for updating
    var id = getCookie("recipeUserId");

    xhttp.open("PUT", `http://${hostname}/api/shoppingList/${id}`);
    var data = {};
    data.userId = id;
    data.shoppingList = shoppingItemList;
    console.log(ticked);
    data.ticked = ticked;

    var json = JSON.stringify(data);

    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Success");
            if (document.getElementById('shopping-list-item-container').classList.contains('delete'))
            {
                getShoppingList();
            }
        }
    }
    xhttp.send(json);
}