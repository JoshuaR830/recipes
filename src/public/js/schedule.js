var downX;
var downY;

var counter = 0;

function onScheduleLoaded(){
    document.getElementById('shopping-list-reveal').style.display = 'inline-block';
    document.getElementById('recipe-list-reveal').style.display = 'inline-block';
    document.getElementById('delete-shopping-item').style.display = 'none';
    document.getElementById('calendar-reveal').style.display = 'none';
    document.getElementById('account-switcher').style.display = 'none';

    var schedule = document.getElementById('schedule-container');
    var recipeSelector = document.getElementById('recipe-selector-container');
    var recipe = document.getElementById('recipe-container');
    var shoppingList = document.getElementById('shopping-list-container');
    var login = document.getElementById('login-container');
    
    
    schedule.style.display = 'inline-block';
    recipeSelector.style.display = 'none';
    recipe.style.display = 'none';
    shoppingList.style.display = 'none';
    login.style.display = 'none';
           
    title = document.querySelector('.title');
    subtitle = document.querySelector('.subtitle');

    title.innerText = "Recipes";
    subtitle.innerText = "Log into your account";

    console.log("Hello");

    dayContainer = document.getElementById('day-container');
    dayContainer.addEventListener('touchstart', touch, false);
    dayContainer.addEventListener('mousedown', touch, false);
    dayContainer.addEventListener('touchend', swiped, false);
    dayContainer.addEventListener('mouseup', swiped, false);
}

function touch(event) {
    console.log(event.type);
    if(event.type === "touchstart") {
        downX = event.touches[0].screenX;
        downY = event.touches[0].screenY;
    }   
    if(event.type === "mousedown") {
        downX = event.clientX;
        downY = event.clientY;
    }
    console.log(`{${downX},${downY}}`);
}

function swiped(event) {

    if(event.type === "touchend") {
        var upX = event.changedTouches[0].screenX;
        var upY = event.changedTouches[0].screenY;
    } 
    if(event.type === "mouseup") {
        var upX = event.clientX;
        var upY = event.clientY;
    }
    

    console.log(`{${upX},${upY}}`);

    if (Math.abs(upX - downX) > 50) {
        console.log("Difference: ", `{${Math.abs(upX - downX)},${Math.abs(upY - downY)}}`);
        if(upX > downX) {
            console.log("Swiped right");
            console.log("load left pane")
            counter --;
        } else {
            console.log("Swiped left");
            console.log("load right pane");
            counter ++;
        }

        if (counter < 0) {
            counter += 7;
        }

        console.log(counter)
    }
}

