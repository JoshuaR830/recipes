var downX;
var downY;

var counter = 0;
var isOdd = true;
var direction = "";
var previousTimeStamp = 0;
var wait = false;

var days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

var recipeDays;

class ScheduledDay {
    constructor(day, breakfast, lunch, dinner) {
        this.day = day;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
    }
}

function onScheduleLoaded() {
    if (!location.pathname.includes('/planner')) {
        history.pushState(null, null, '/planner');
    }
    getScheduledRecipes();
}

function onScheduledRecipesRetrieved(){
    var ups = document.querySelectorAll('.schedule-up');
    ups.forEach(function(up) {
        up.style.display = "none";
    });

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

    odd = document.getElementById('odd-schedule');
    even = document.getElementById('even-schedule');
    odd.addEventListener('touchstart', touch, false);
    odd.addEventListener('mousedown', touch, false);
    odd.addEventListener('touchend', swiped, false);
    odd.addEventListener('mouseup', swiped, false);
    even.addEventListener('touchstart', touch, false);
    even.addEventListener('mousedown', touch, false);
    even.addEventListener('touchend', swiped, false);
    even.addEventListener('mouseup', swiped, false);

    var leftNav = document.getElementById('desktop-schedule-left');
    var rightNav = document.getElementById('desktop-schedule-right');

    leftNav.addEventListener('click', function(event) {
        console.log(event.timeStamp);
        if(event.timeStamp - previousTimeStamp > 500) {
            counter --;
            previousTimeStamp = event.timeStamp;
            moveScheduleDay("right");
        }
    });

    rightNav.addEventListener('click', function(event) {
        if(event.timeStamp - previousTimeStamp > 500) {
            counter ++;
            previousTimeStamp = event.timeStamp;
            moveScheduleDay("left");
        }
    });

    var odd = document.getElementById('odd-schedule');
    var even = document.getElementById('even-schedule');
    var evenTitle = document.getElementById('day-name-even');
    var oddTitle = document.getElementById('day-name-odd');

    oddTitle.innerHTML = days[counter];

    var breakfast = recipeDays[counter].breakfast;
    var lunch = recipeDays[counter].lunch;
    var dinner = recipeDays[counter].dinner;
    
    console.log(breakfast);
    console.log(lunch);
    console.log(dinner);
    

    document.getElementById('odd-breakfast-title').textContent = breakfast.Name;
    document.getElementById('odd-breakfast-description').textContent = breakfast.Description;
    document.getElementById('odd-breakfast-image').src = breakfast.ImageUrl;

    document.getElementById('odd-lunch-title').textContent = lunch.Name;
    document.getElementById('odd-lunch-description').textContent = lunch.Description;
    document.getElementById('odd-lunch-image').src = lunch.ImageUrl;

    document.getElementById('odd-dinner-title').textContent = dinner.Name;
    document.getElementById('odd-dinner-description').textContent = dinner.Description;
    document.getElementById('odd-dinner-image').src = dinner.ImageUrl;

    var infoExpandables = document.querySelectorAll('.schedule-bar');
    
    infoExpandables.forEach(function(info) {
        info.addEventListener('click', function(event) {
            var number = event.currentTarget.id.split('-')[2];
            if(event.currentTarget.classList.contains('schedule-bar-active'))
            {
                document.getElementById(`recipe-${number}`).classList.remove('schedule-card-active');
                document.getElementById(`schedule-image-${number}`).classList.remove('schedule-image-active');
                document.getElementById(`schedule-bar-${number}`).classList.remove('schedule-bar-active');
                document.getElementById(`expandable-${number}`).classList.remove('expandable-info-active');
                document.getElementById(`drop-symbol-down-${number}`).style.display = "block";
                document.getElementById(`drop-symbol-up-${number}`).style.display = "none";
                
            } else {
                document.getElementById(`recipe-${number}`).classList.add('schedule-card-active');
                document.getElementById(`schedule-image-${number}`).classList.add('schedule-image-active');
                document.getElementById(`schedule-bar-${number}`).classList.add('schedule-bar-active');
                document.getElementById(`expandable-${number}`).classList.add('expandable-info-active');
                document.getElementById(`drop-symbol-down-${number}`).style.display = "none";
                document.getElementById(`drop-symbol-up-${number}`).style.display = "block";
            }
        });
    });
    
    var images = document.querySelectorAll('.schedule-img');
    images.forEach(function(image) {
        image.addEventListener('click', function(event) {
            console.log(event.currentTarget.id);
            var time = event.currentTarget.id.split('-')[1];
            console.log(time);
            var recipeId = recipeDays[counter][time].Id;
            console.log(recipeId);
            getRecipeById(recipeId);
        })
    })
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

    if (Math.abs(upY - downY) > 100) {
        return;
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

        moveScheduleDay(direction);
    }
}

function moveScheduleDay(direction) {
    if (counter < 0) {
        counter += 7;
    }

    if (counter > 6) {
        counter -= 7;
    }

    var odd = document.getElementById('odd-schedule');
    var even = document.getElementById('even-schedule');
    var evenTitle = document.getElementById('day-name-even');
    var oddTitle = document.getElementById('day-name-odd');

    oddCards = document.getElementById('schedule-card-container-odd');
    evenCards = document.getElementById('schedule-card-container-even');

    var bars = document.querySelectorAll('.schedule-bar');
    bars.forEach(function(bar) {
        console.log(bar.id);
        console.log(bar.id.split('-')[2]);
        var number = bar.id.split('-')[2];
        document.getElementById(`recipe-${number}`).classList.remove('schedule-card-active');
        document.getElementById(`schedule-image-${number}`).classList.remove('schedule-image-active');
        document.getElementById(`schedule-bar-${number}`).classList.remove('schedule-bar-active');
        document.getElementById(`expandable-${number}`).classList.remove('expandable-info-active');
    });

    var downs = document.querySelectorAll('.schedule-down');
    downs.forEach(function(down) {
        down.style.display = "block";
    });
    
    var ups = document.querySelectorAll('.schedule-up');
    ups.forEach(function(up) {
        up.style.display = "none";
    });
    
    
    

    if(isOdd) {
        // odd.innerHTML = counter;

        evenCards.style.display = 'inline-block';

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

        evenTitle.innerHTML = days[counter];

        var breakfast = recipeDays[counter].breakfast;
        var lunch = recipeDays[counter].lunch;
        var dinner = recipeDays[counter].dinner;
        
        console.log(breakfast);
        console.log(lunch);
        console.log(dinner);
        
    
        document.getElementById('even-breakfast-title').textContent = breakfast.Name;
        document.getElementById('even-breakfast-description').textContent = breakfast.Description;
        document.getElementById('even-breakfast-image').src = breakfast.ImageUrl;

        document.getElementById('even-lunch-title').textContent = lunch.Name;
        document.getElementById('even-lunch-description').textContent = lunch.Description;
        document.getElementById('even-lunch-image').src = lunch.ImageUrl;

        document.getElementById('even-dinner-title').textContent = dinner.Name;
        document.getElementById('even-dinner-description').textContent = dinner.Description;
        document.getElementById('even-dinner-image').src = dinner.ImageUrl;


        // swipedCleanUp(even, odd)
        setTimeout(swipedCleanUp, 500, even, odd);
        // oddCards.style.display = 'none';


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
        oddCards.style.display = 'inline-block';


        oddTitle.innerHTML = days[counter];

        var breakfast = recipeDays[counter].breakfast;
        var lunch = recipeDays[counter].lunch;
        var dinner = recipeDays[counter].dinner;
        
        console.log(breakfast);
        console.log(lunch);
        console.log(dinner);
        
    
        document.getElementById('odd-breakfast-title').textContent = breakfast.Name;
        document.getElementById('odd-breakfast-description').textContent = breakfast.Description;
        document.getElementById('odd-breakfast-image').src = breakfast.ImageUrl;

        document.getElementById('odd-lunch-title').textContent = lunch.Name;
        document.getElementById('odd-lunch-description').textContent = lunch.Description;
        document.getElementById('odd-lunch-image').src = lunch.ImageUrl;

        document.getElementById('odd-dinner-title').textContent = dinner.Name;
        document.getElementById('odd-dinner-description').textContent = dinner.Description;
        document.getElementById('odd-dinner-image').src = dinner.ImageUrl;

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
        // evenCards.style.display = 'none';

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

function getScheduledRecipes() {

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(JSON.parse(this.responseText));
            recipeDays = [
                new ScheduledDay("Saturday", response.Saturday.Breakfast, response.Saturday.Lunch, response.Saturday.Dinner),
                new ScheduledDay("Sunday", response.Sunday.Breakfast, response.Sunday.Lunch, response.Sunday.Dinner),
                new ScheduledDay("Monday", response.Monday.Breakfast, response.Monday.Lunch, response.Monday.Dinner),
                new ScheduledDay("Tuesday", response.Tuesday.Breakfast, response.Tuesday.Lunch, response.Tuesday.Dinner),
                new ScheduledDay("Wednesday", response.Wednesday.Breakfast, response.Wednesday.Lunch, response.Wednesday.Dinner),
                new ScheduledDay("Thursday", response.Thursday.Breakfast, response.Thursday.Lunch, response.Thursday.Dinner),
                new ScheduledDay("Friday", response.Friday.Breakfast, response.Friday.Lunch, response.Friday.Dinner)
            ];
            console.log(recipeDays);
            
            onScheduledRecipesRetrieved();
        }
    };
    
    xhttp.open("GET", `http://${hostname}/api/scheduledrecipes/${getCookie("recipeUserId")}`);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send();
}