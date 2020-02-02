var methodData = [];
var ingredientData = [];
var data = [];
var dragFrom = "drag0";
var dragTo = "drag0";

var originalPosition;

function DragAndDrop() {
    console.log("Hi");
    var methodButton = document.getElementById('method-addition');
    methodButton.addEventListener('click', function() {
        console.log("Hi");

        methodData.push("");
        var methodStep = document.createElement('div');
        var thisId = methodData.length - 1
        methodStep.id = `drag-method${thisId}`;
        methodStep.setAttribute('draggable', true);
        methodStep.setAttribute('ondragstart', 'drag(event)');
        methodStep.setAttribute('ondrop', 'dropMethod(event)');
        methodStep.setAttribute('ondragover', 'allowDrop(event)');
        methodStep.setAttribute('ondragleave', 'noLine(event)');
        methodStep.classList.add("method-step");
        methodStep.classList.add("create-step-row");
        // methodStep.innerHTML = `<input id="input-method${thisId}" class="recipe-step input-detail">`
        methodStep.innerHTML = `<div id="input-method${thisId}" class="text-area" contenteditable></div>`

        document.getElementById('method-step-container').appendChild(methodStep);
        document.getElementById(`input-method${thisId}`).addEventListener('input', function(event) {
            id = event.currentTarget.id.replace('input-method', '');
            methodData[id] = document.getElementById(`input-method${thisId}`).innerText;
        });
    });
    
    var ingredientButton = document.getElementById('ingredient-addition');
    ingredientButton.addEventListener('click', function() {
        ingredientData.push("");
        var methodStep = document.createElement('div');
        var thisId = ingredientData.length - 1
        methodStep.id = `drag-ingredient${thisId}`;
        methodStep.setAttribute('draggable', true);
        methodStep.setAttribute('ondragstart', 'drag(event)');
        methodStep.setAttribute('ondrop', 'dropIngredient(event)');
        methodStep.setAttribute('ondragover', 'allowDrop(event)');
        methodStep.setAttribute('ondragleave', 'noLine(event)');
        methodStep.classList.add("ingredient-item");
        methodStep.classList.add("create-step-row");
        // methodStep.innerHTML = `<input id="input-ingredient${thisId}" class="recipe-step input-detail">`
        methodStep.innerHTML = `<div id="input-ingredient${thisId}" class="text-area" contenteditable></div>`
        document.getElementById('ingredient-item-container').appendChild(methodStep);
        document.getElementById(`input-ingredient${thisId}`).addEventListener('input', function(event) {
            id = event.currentTarget.id.replace('input-ingredient', '');
            ingredientData[id] = document.getElementById(`input-ingredient${thisId}`).innerText;
        });
    });
}

function reorderMethodData() {
    dragFromInt = dragFrom.replace('drag-method', '');
    dragToInt = dragTo.replace('drag-method', '');

    var removedMethodData = methodData.splice(dragFromInt, 1);
    methodData.splice(dragToInt, 0, removedMethodData);

    for (var i = 0; i < methodData.length; i ++) {
        console.log(methodData[i]);
        document.getElementById(`input-method${i}`).innerText = methodData[i];
    }
}

function reorderIngredientData() {
    dragFromInt = dragFrom.replace('drag-ingredient', '');
    dragToInt = dragTo.replace('drag-ingredient', '');

    var removedIngredientData = ingredientData.splice(dragFromInt, 1);
    ingredientData.splice(dragToInt, 0, removedIngredientData);

    for (var i = 0; i < ingredientData.length; i ++) {
        console.log(ingredientData[i]);
        document.getElementById(`input-ingredient${i}`).innerText = ingredientData[i];
    }
}

function allowDrop(e) {
    e.preventDefault();
    var divId = e.currentTarget.id;
    console.log(originalPosition);
    if (e.clientX > originalPosition) {
        document.getElementById(divId).classList.add('below');
        document.getElementById(divId).classList.remove('above');
    } else {
        document.getElementById(divId).classList.add('above');
        document.getElementById(divId).classList.remove('below');
    }
}

function noLine(e) {
    console.log("No line");
    var divId = e.currentTarget.id;
    document.getElementById(divId).classList.remove('below');
    document.getElementById(divId).classList.remove('above');
}

function drag(e) {
    console.log("Drag");

    console.log(e.clientX);
    originalPosition = e.clientX;
    e.dataTransfer.setData("text", e.currentTarget.id);
    dragFrom = e.currentTarget.id;
    document.getElementById(dragFrom).classList.add('on-drag');
    console.log("Dragging")
}

function dropMethod(e) {
    onDrop(e);
    reorderMethodData();
}

function dropIngredient(e) {
    onDrop(e);
    reorderIngredientData();
}

function onDrop(e) {
    console.log("On Drop");
    e.preventDefault();
    var divId = e.currentTarget.id;
    dragTo = e.currentTarget.id;
    document.getElementById(dragFrom).classList.remove('on-drag');
    document.getElementById(divId).classList.remove('below');
    document.getElementById(divId).classList.remove('above');
}

