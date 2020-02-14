function loadShoppingList() {
    document.getElementById('shopping-list-reveal').style.display = 'none';
    document.getElementById('recipe-list-reveal').style.display = 'inline-block';
    document.getElementById('delete-shopping-item').style.display = 'inline-block';
    document.getElementById('calendar-reveal').style.display = 'inline-block';
    document.getElementById('account-switcher').style.display = 'none';

    var foreground = document.getElementById('foreground-content-container');
    var listContainer = document.getElementById('shopping-list-container');
    var content = document.getElementById("add-shopping-item");
    var loginContainer = document.getElementById('login-container');

    if(!document.contains(foreground)){
        console.log("No content");
    }

    if(!listContainer.contains(content)) {
        console.log("Had to load");
        title = document.querySelector('.title');
        foregroundRequest = new XMLHttpRequest();
        foregroundRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                listContainer.innerHTML = this.responseText;
                OnShoppingListLoaded();
            }
        };
        foregroundRequest.open("GET", `/shopping-list-content`);
        foregroundRequest.send();
    }

    var allRecipes = document.getElementById('recipe-selector-container');
    var recipe = document.getElementById('recipe-container');
    var shoppingList = document.getElementById('shopping-list-container');

    if (!location.pathname.includes('/shopping-list')) {
        history.pushState(null, null, '/shopping-list');
    }
    recipe.style.display = "none";
    allRecipes.style.display = 'none';
    loginContainer.style.display = "none";

    title.innerText = "Shopping List";
    subtitle.innerText = "Add the items you need";

    shoppingList.style.display = "inline-block";

}