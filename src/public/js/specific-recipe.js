function switchRecipe() {
    console.log("Hello");
    var method = document.getElementById('method');
    var ingredients = document.getElementById('ingredients');

    var stepContainer = document.getElementById('recipe-steps-container');
    var ingredientContainer = document.getElementById('ingredient-container');

    method.addEventListener('click', function(e) {
        ingredients.classList.remove('active-switcher');
        method.classList.add('active-switcher');
        stepContainer.style.display = "block";
        ingredientContainer.style.display = "none";
    });

    ingredients.addEventListener('click', function(e) {
        method.classList.remove('active-switcher');
        ingredients.classList.add('active-switcher');
        stepContainer.style.display = "none";
    ingredientContainer.style.display = "block";
    });
}

