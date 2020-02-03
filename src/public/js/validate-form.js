function validateForm(recipeName, description, myImage, method, ingredientItems) {   
    var valid = true;

    inputElement = document.getElementById('image-input');
    nameElement = document.getElementById('recipe-name');
    descriptionElement = document.getElementById('recipe-description');
    imageElement = document.querySelector('.preview-image');
    imagePlaceHolder = document.getElementById('image-upload-button')
    methodElement = document.getElementById('method-step-container');
    ingredientElement = document.getElementById('ingredient-item-container');


    nameElement.classList.remove('error');
    descriptionElement.classList.remove('error');


    if (recipeName.length === 0) {
        console.log("You have not entered a name for your recipe");
        valid = false;
        nameElement.classList.add('error');
        
    }
    
    if (recipeName.length > 20) {
        console.log("Recipe name is too long");
        valid = false;
        nameElement.classList.add('error');
    }

    if (description.length === 0) {
        console.log("You have not entered a description for your recipe");
        valid = false;
        descriptionElement.classList.add('error');
    }
    
    if (description.length > 80) {
        console.log("Description name is too long");
        valid = false;
        descriptionElement.classList.add('error');
    } 

    if (myImage === undefined) {
        console.log("No image has been uploaded");
        valid = false;
        imageElement.classList.add('error');
        imagePlaceHolder.classList.add('image-error');
    } else {
        console.log(myImage);
        if (myImage.size > 10000000) {
            console.log("File is too big to upload");
            valid = false;
            imageElement.classList.add('error');
        } else {
            imageElement.classList.remove('error');
        }
    }

    if (method.length === 0) {
        console.log("No method steps entered");
        valid = false;
        methodElement.classList.add('error');
    } else {
        methodElement.classList.remove('error');
    }

    if (ingredientItems.length === 0) {
        console.log("No ingredients entered");
        valid = false;
        ingredientElement.classList.add('error');
    } else {
        ingredientElement.classList.remove('error');
    }

    return valid;
}

function validateFormOnSubmit() {
    var input = document.getElementById('image-input');
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
    console.log("Validating");
    return validateForm(name, description, myImage, method, ingredientItems);
}