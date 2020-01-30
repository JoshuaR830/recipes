function onImageFormLoaded() {
    var input = document.getElementById('image-input');
    var preview = document.getElementById('preview');

    input.addEventListener('change', function() {
        preview.innerHTML = "";
        var myImage = input.files;
        if(validType(myImage[0])) {
            console.log(myImage[0].name);
            var imagePreview = document.createElement('img');
            imagePreview.src = window.URL.createObjectURL(myImage[0]);
            imagePreview.classList.add('preview-image');
            preview.appendChild(imagePreview);          
        }
    })


    document.getElementById('method-addition').addEventListener('click', function() {
        console.log("Method addition");

        var methodStep = document.createElement('div');
        methodStep.classList.add("method-step");
        methodStep.classList.add("create-step-row");
        methodStep.innerHTML = `<input type="text" class="recipe-step input-detail">`

        document.getElementById('method-step-container').appendChild(methodStep);
    });

    document.getElementById('ingredient-addition').addEventListener('click', function() {
        console.log("Ingredient addition");

        var methodStep = document.createElement('div');
        methodStep.classList.add("ingredient-item");
        methodStep.classList.add("create-step-row");
        methodStep.innerHTML = `<input type="text" class="recipe-step input-detail">`

        document.getElementById('ingredient-item-container').appendChild(methodStep);
    });


    document.getElementById('submit-form').addEventListener('click', function() {
        var name = document.getElementById('recipe-name').value;
        var description = document.getElementById('recipe-description').value;
        var myImage = input.files;
        var imageUrl = `http://flatfish.online:38120/images/${myImage[0].name}`;

        var method = document.querySelectorAll('.method-step')
        var ingredientItems = document.querySelectorAll('.ingredient-item')
        
        var methodSteps = [];
        var ingredients = [];

        method.forEach(step => {
            methodSteps.push(step.firstChild.value);
        });

        ingredientItems.forEach(ingredient => {
            ingredients.push(ingredient.firstChild.value);
        });

        console.log(methodSteps);
        console.log(ingredients);

        postRecipe(name, description, imageUrl, methodSteps, ingredient);
    });


    function postRecipe(name, description, imageUrl, methodSteps, ingredient) {
        console.log("Hi");
        console.log(name, description, imageUrl);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://flatfish.online:35001/api/addrecipe");
        var data = {};
        data.name = name;
        data.description = description;
        data.imageUrl = imageUrl;
        data.methodSteps = methodSteps;
        data.ingredient = ingredient;

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

    function validType() {
        console.log("Change");
        return true;
    }
}