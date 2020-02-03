function onImageFormLoaded() {
    var input = document.getElementById('image-input');
    var preview = document.getElementById('preview');

    input.addEventListener('change', function() {
        console.log("Image changed");
        preview.innerHTML = "";
        console.log("Hello");
        var myImage = input.files[0];
        if(validType(myImage)) {
            console.log(myImage.name);
            var imagePreview = document.createElement('img');
            imagePreview.src = window.URL.createObjectURL(myImage);
            imagePreview.classList.add('preview-image');
            preview.appendChild(imagePreview);
        }
    })

    document.getElementById('submit-form').addEventListener('click', function() {

        var name = document.getElementById('recipe-name').innerText;
        var description = document.getElementById('recipe-description').innerText;
        var myImage = input.files[0];
        var method = document.querySelectorAll('.method-step');
        var ingredientItems = document.querySelectorAll('.ingredient-item');

        var methodSteps = [];
        var ingredients = [];

        method.forEach(step => {
            if(step.firstChild.innerText.length > 0) {
                methodSteps.push(step.firstChild.innerText);
            }
        });

        ingredientItems.forEach(ingredient => {
            if(ingredient.firstChild.innerText.length > 0) {
                ingredients.push(ingredient.firstChild.innerText);
            }
        });
    
        var valid = validateForm(name, description, myImage, method, ingredientItems);
        console.log(">>>>>" + valid)
        if (valid === true) {
            console.log(description);
            console.log(method);
            console.log(ingredientItems);
            
            var imageUrl = `http://flatfish.online:38120/images/${myImage.name}`;
            
            

            console.log(methodSteps);
            console.log(ingredients);

            postRecipe(name, description, imageUrl, methodSteps, ingredients);
        }
    });


    function postRecipe(name, description, imageUrl, methodSteps, ingredients) {
        console.log("Hi");
        console.log(name, description, imageUrl);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://flatfish.online:35001/api/addrecipe");
        var data = {};
        data.name = name;
        data.description = description;
        data.imageUrl = imageUrl;
        data.methodSteps = methodSteps;
        data.ingredients = ingredients;

        console.log("Hello");
        console.log(methodSteps);
        console.log(ingredients);

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

    function validType(myImage) {
        if (myImage === undefined) {
            return false;
        }
        console.log("Change");
        return true;
    }
}