function onRecipesLoaded() {
    renderRecipes();
}

function displaySpecificRecipe(event) {
    var id = event.currentTarget.id;
    var details = getRecipeById(id);
    var recipeSelector = document.getElementById('recipe-selector-container');
    var specificRecipe = document.getElementById('recipe-container');
    recipeSelector.style.display = 'none';
    specificRecipe.style.display = 'inline-block';
    setupMethod(details.method);
    setupIngredients(details.ingredients);
    console.log("Recipe displayed");
}

function setupMethod(method) {
    console.log(method);
    var stepContainer = document.getElementById('recipe-steps-container');
    var html = "";
    var counter = 0;
    method.forEach(function(step) {
        console.log(step);
        counter ++;
        html += `
            <div class="step-row">
                <div id="status-container-${counter}" class="status status-complete">
                    <div id="status-number-${counter}" class="status-number">${counter}</div>
                    <div id="status-tick-${counter}" class="status-tick hidden"><svg xmlns="http://www.w3.org/2000/svg" class="step-tick" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></div>
                </div>
                <div class="step-description description-complete">${step}</div>
            </div>`;
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
}

function setupIngredients(ingredients) {
    console.log(ingredients);
    var html = "";
    var counter = 0;
    ingredients.forEach(function(ingredient) {
        counter ++;
        console.log(ingredient);
        html += ``;
    });
}

// Returns the details for a specific recipe
function getRecipeById(id) {
    console.log(`Make a request for the ${id} recipe`);
    var details = {"method":["step 1", "step 2"], "ingredients":["butter", "flour"]};
    return details;
}

// All available recipes displayed
function renderRecipes() {
    var recipeSelector = document.getElementById('recipe-selector-container');

    var recipes = getRecipeIds();
    var html = "";

    recipes.forEach(function(recipe) {
        html += `<div id="${recipe}" class="card">
                    <div class="card-image">
                        <img class="image" src="/images/color-wheel.png">
                    </div>
                    <div class="card-body">
                        <div class="card-title">${recipe}</div>
                        <div class="card-text">A delicious recipe for you</div>
                        </div>
                </div>`
    });
    recipeSelector.innerHTML = html;
    var recipesCards = document.querySelectorAll('.card');
    recipesCards.forEach(function(recipe) {
        recipe.addEventListener('click', displaySpecificRecipe);
    });
}

// Gets all available recipes and returns an array of id's
function getRecipeIds() {
    var recipeIds = ['abcd', 'efgh', 'ijkl'];
    return recipeIds;
}