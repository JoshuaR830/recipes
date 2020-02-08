function loadShoppingList() {
    foreground = document.querySelector('.foreground-content-container');
    foregroundRequest = new XMLHttpRequest();
    foregroundRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            foreground.innerHTML = this.responseText;
            shoppingListLoaded()
        }
    };
    foregroundRequest.open("GET", `/shopping-list`);
    foregroundRequest.send();
}