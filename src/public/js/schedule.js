var downX;
var downY;

var counter = 0;
var isOdd = true;
var direction = "";
var previousTimeStamp = 0;
var wait = false;

var days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

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

    title.innerText = "Planner";
    subtitle.innerText = "Plan your meals for the week";

    console.log("Hello");

    dayContainer = document.getElementById('day-container');
    dayContainer.addEventListener('touchstart', touch, false);
    dayContainer.addEventListener('mousedown', touch, false);
    dayContainer.addEventListener('touchend', swiped, false);
    dayContainer.addEventListener('mouseup', swiped, false);

    var odd = document.getElementById('odd-schedule');
    var even = document.getElementById('even-schedule');

    odd.innerHTML = days[counter];

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

    if(event.timeStamp - previousTimeStamp > 500) {
        previousTimeStamp = event.timeStamp;
        wait = false;
    } else {
        wait = true;
    }
    console.log(previousTimeStamp);
    if (wait){
        return;
    }

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
            console.log("load left pane");
            direction = "right";
            counter --;
        } else {
            console.log("Swiped left");
            console.log("load right pane");
            direction = "left";
            counter ++;
        }

        if (counter < 0) {
            counter += 7;
        }

        if (counter > 6) {
            counter -= 7;
        }

        var odd = document.getElementById('odd-schedule');
        var even = document.getElementById('even-schedule');

        if(isOdd) {

            // odd.innerHTML = counter;
            odd.style.display = 'inline-block';
            even.style.display = 'none';
            isOdd = false;
            console.log("Even");
            console.log(direction);
            even.style.display = 'inline-block';
            if(direction === "right") {
                odd.classList.add('exit-right');
            }
            
            if(direction === "left") {
                odd.classList.add('exit-left');             
            }

            even.innerHTML = days[counter];
            

            // swipedCleanUp(even, odd)
            setTimeout(swipedCleanUp, 500, even, odd);

            // odd.classList.remove('enter-left');
            // odd.classList.remove('exit-right');
            // odd.classList.add('exit-left');
            // odd.classList.remove('enter-right');
            // even.classList.remove('enter-left');
            // even.classList.remove('exit-right');
            // even.classList.remove('exit-left');
            // even.classList.add('enter-right');
            // console.log("Odd happened");
        } else {
            odd.innerHTML = days[counter];
            even.style.display = 'inline-block';
            odd.style.display = 'none';
            isOdd = true;
            console.log("Odd");
            console.log(direction);
            
            // odd.classList.remove('enter-left');
            odd.style.display = 'inline-block';
            

            if(direction === "right") {
                even.classList.add('exit-right');
            }

            if(direction === "left") {
                even.classList.add('exit-left');
            }

            
            setTimeout(swipedCleanUp, 500, odd, even);
            // swipedCleanUp(odd, even);

            // odd.classList.remove('exit-left');
            // odd.classList.add('enter-right');
            // console.log("Odd happened");
            // even.classList.remove('enter-left');
            // even.classList.remove('exit-right');
            // even.classList.remove('enter-right');
            // even.classList.add('exit-left');
            // console.log("Even happened");
        }

        console.log(counter)
    }

    function swipedCleanUp(active, inactive){
        console.log("Delay");
        inactive.style.zIndex = "4";
        active.style.zIndex = "5";
        // inactive.classList.remove('active');
        // active.classList.add('active');
        // active.style.display = 'inline-block';
        // inactive.style.display = 'none';
        active.classList.remove('exit-right');
        active.classList.remove('exit-left');
        inactive.classList.remove('exit-right');
        inactive.classList.remove('exit-left');
    }
}

