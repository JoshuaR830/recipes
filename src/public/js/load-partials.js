var host = window.location.hostname;
console.log(host);

window.addEventListener('load', function() { 
    
    foreground = document.querySelector('.foreground-content-container');
    foregroundRequest = new XMLHttpRequest();
    foregroundRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            foreground.innerHTML = this.responseText;
            onRecipesLoaded();
            switchRecipe();
        }
    };
    foregroundRequest.open("GET", `/foreground`);
    foregroundRequest.send();

    subtitle = document.querySelector('.subtitle');
    subtitleRequest = new XMLHttpRequest();
    subtitleRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            subtitle.innerHTML = this.responseText;
        }
    };
    subtitleRequest.open("GET", `/subtitle`);
    subtitleRequest.send();
    
    
    backgroundRequest = new XMLHttpRequest();
    background = document.querySelector('.background-content-container');
    backgroundRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            background.innerHTML = this.responseText;
            themeSwitcher(getCookie("theme"));
        }
    };
    backgroundRequest.open("GET", `/background`);
    backgroundRequest.send();

    titleRequest = new XMLHttpRequest();
    title = document.querySelector('.title');
    titleRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            title.innerHTML = this.responseText;
        }
    };
    titleRequest.open("GET", `/title`);
    titleRequest.send();



    

    

    

    
    
});