var hostname = 'flatfish.online:35001';

window.addEventListener('popstate', function(e) {
    path = location.pathname;
    console.log(path);
    var allRecipes = document.getElementById('recipe-selector-container');
    var recipe = document.getElementById('recipe-container');
    var shoppingList = document.getElementById('shopping-list-container');

    if (path === '/') {
        recipe.style.display = "none";
        shoppingList.style.display = "none";
        allRecipes.style.display = 'inline-block';
        subtitle.innerText = "Recipes";

    } else if (path === '/shopping-list')
    {
        recipe.style.display = "none";
        allRecipes.style.display = 'none';

        title.innerText = "Shopping List";
        subtitle.innerText = "Add the items you need";

        shoppingList.style.display = "inline-block";
        console.log('On shopping list');
    }
    else {
        allRecipes.style.display = 'none'
        recipe.style.display = "inline-block";
        shoppingList.style.display = "none";
    }
});

function onRecipesLoaded() {
    console.log("Hello");

    var button = document.getElementById('add-recipe-button');
    button.addEventListener('click', function() {
        window.location.href = "/image-upload";
    });

    getRecipeIds();
}

function displaySpecificRecipe(event) {
    var id = event.currentTarget.id;
    history.pushState(null, null, 'recipes/' + id);
    getRecipeById(id);
}

function renderSpecificRecipe(details) {
    var recipeSelector = document.getElementById('recipe-selector-container');
    var specificRecipe = document.getElementById('recipe-container');
    recipeSelector.style.display = 'none';
    specificRecipe.style.display = 'inline-block';
    console.log(">>>", details.MethodSteps);
    setupMethod(details.MethodSteps);
    setupIngredients(details.Ingredients);
    console.log("Recipe displayed");
    subtitle.innerText = details.Name;
}

function setupMethod(method) {
    console.log(method);
    var stepContainer = document.getElementById('recipe-steps-container');
    var ingredientContainer = document.getElementById('ingredient-container');
    stepContainer.style.display = "block";
    ingredientContainer.style.display = "none";
    var html = "";
    var counter = 0;
    method.forEach(function(step) {
        if(step.length > 0) {
            console.log(step);
            counter ++;
            html += `
                <div class="step-row">
                    <div id="status-container-${counter}" class="status status-complete">
                        <div id="status-number-${counter}" class="status-number">${counter}</div>
                        <div id="status-tick-${counter}" class="status-tick hidden"><svg xmlns="http://www.w3.org/2000/svg" class="step-tick" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></div>
                    </div>
                    <div id="step-description-${counter}" class="step-description">${step}</div>
                </div>`;
        }
    });
    stepContainer.innerHTML = html;

    var statuses = document.querySelectorAll(".status");
    statuses.forEach(function(status) {
        status.addEventListener('click', function(event) {
            console.log('Clicked the status')
            var stepNumber = event.currentTarget.id.replace('status-container-', '');
            console.log(stepNumber);
            stepCompleted(stepNumber);
        })
    })
}

function stepCompleted(stepNumber) {
    document.getElementById(`status-number-${stepNumber}`).style.display = 'none';
    document.getElementById(`status-tick-${stepNumber}`).style.display = 'inline-block';
    document.getElementById(`step-description-${stepNumber}`).classList.add('description-complete');
}

function setupIngredients(ingredients) {
    var ingredientContainer = document.getElementById('ingredient-container');
    console.log(ingredients);
    var html = "";
    var counter = 0;
    ingredients.forEach(function(ingredient) {
        if(ingredient.length > 0) {
            counter ++;
            console.log(ingredient);
            html += `
            <div class="step-row">
                <div id="status-container-${counter}" class="status status-complete">
                    <div id="status-number-${counter}" class="status-number">${counter}</div>
                    <div id="status-tick-${counter}" class="status-tick hidden"><svg xmlns="http://www.w3.org/2000/svg" class="step-tick" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></div>
                </div>
                <div id="step-description-${counter}" class="step-description">${ingredient}</div>
            </div>`;
        }
    });
    ingredientContainer.innerHTML = html;
}

// Returns the details for a specific recipe
function getRecipeById(id) {
    console.log(id);
    console.log(`Make a request for the ${id} recipe`);
    var details = {"method":["step 1", "step 2"], "ingredients":["butter", "flour"]};

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(">>Hello<<");
            console.log(this.responseText);
            renderSpecificRecipe(JSON.parse(this.responseText));
        }
    };

    xhttp.open("GET", `http://${hostname}/api/recipes/`+id);
    xhttp.send();
}

// All available recipes displayed
function renderRecipes(recipes) {
    var recipeSelector = document.getElementById('selector-container');
    var allRecipes = document.getElementById('recipe-selector-container');
    var html = "";

    recipes.forEach(function(recipe) {
        html += `<div id="${recipe.Id}" class="card">
                    <div class="card-image">
                        <img class="image" src="${recipe.ImageUrl}">
                    </div>
                    <div class="card-body">
                        <div class="card-title">${recipe.Name}</div>
                        <div class="card-text">${recipe.Description}</div>
                        </div>
                </div>`
    });
    
    recipeSelector.innerHTML = html;
    var recipesCards = document.querySelectorAll('.card');
    recipesCards.forEach(function(recipe) {
        recipe.addEventListener('click', displaySpecificRecipe);
    });

    if(location.pathname.includes('/recipes/')) {
        allRecipes.style.display = 'none';
        getRecipeById(location.pathname.split("/")[2]);
    } else if (location.pathname.includes('/shopping-list')) {
        loadShoppingList();
    }else {
        allRecipes.style.display = 'inline-block';
    }
}

// Gets all available recipes and returns an array of id's
function getRecipeIds() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            recipeIds = response;
            console.log(JSON.parse(response));
            console.log(typeof JSON.parse(response));
            renderRecipes(JSON.parse(response));
        }
    };

    xhttp.open("GET", `http://${hostname}/api/recipes`);
    xhttp.send();
}


function postRecipe() {
    console.log("Hi");
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://${hostname}}/api/addrecipe`);
    var data = {};
    data.name = "Joshua";
    data.description = "Joshua did this";
    data.imageUrl = `http://${hostname}/images/AtUllswater.png`;

    var json = JSON.stringify(data);

    console.log(json);

    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
    xhttp.send(json);
}

function putRecipe(name, description, imageUrl) {
    console.log("Hi");
    var xhttp = new XMLHttpRequest();
    // Needs an ID - used for updating
    xhttp.open("PUT", `http://${hostname}/api/addrecipe`);
    var data = {};
    data.name = name;
    data.description = description;
    data.imageUrl = imageUrl;

    var json = JSON.stringify(data);

    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var users = JSON.parse(this.responseText);
        }
    }
    xhttp.send(json);
}