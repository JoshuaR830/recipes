var data = [];
var dragFrom = "drag0";
var dragTo = "drag0";

var originalPosition;

window.addEventListener('load', function(event) {
    var addButton = document.getElementById('add-button');
    addButton.addEventListener('click', function() {
        data.push("");
        var methodStep = document.createElement('div');
        var thisId = data.length - 1
        methodStep.id = `drag${thisId}`;
        methodStep.setAttribute('draggable', true);
        methodStep.setAttribute('ondragstart', 'drag(event)');
        methodStep.setAttribute('ondrop', 'drop(event)');
        methodStep.setAttribute('ondragover', 'allowDrop(event)');
        methodStep.setAttribute('ondragleave', 'noLine(event)');
        methodStep.classList.add("ingredient-item");
        methodStep.classList.add("create-step-row");
        methodStep.innerHTML = `<input id="input${thisId}" class="recipe-step input-detail">`
        document.getElementById('drag-and-drop-container').appendChild(methodStep);
        document.getElementById(`input${thisId}`).addEventListener('input', function(event) {
            id = event.currentTarget.id.replace('input', '');
            data[id] = document.getElementById(`input${thisId}`).value;
        });
    });
});

function reorderData() {
    dragFromInt = dragFrom.replace('drag', '');
    dragToInt = dragTo.replace('drag', '');

    var removedData = data.splice(dragFromInt, 1);
    data.splice(dragToInt, 0, removedData);

    for (var i = 0; i < data.length; i ++) {
        console.log(data[i]);
        document.getElementById(`input${i}`).value = data[i];
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
    var divId = e.currentTarget.id;
    document.getElementById(divId).classList.remove('below');
    document.getElementById(divId).classList.remove('above');
}

function drag(e) {
    originalPosition = e.clientX;
    e.dataTransfer.setData("text", e.currentTarget.id);
    dragFrom = e.currentTarget.id;
    document.getElementById(dragFrom).classList.add('on-drag');
}

function drop(e) {
    e.preventDefault();
    var divId = e.currentTarget.id;
    dragTo = e.currentTarget.id;
    document.getElementById(dragFrom).classList.remove('on-drag');
    document.getElementById(divId).classList.remove('below');
    document.getElementById(divId).classList.remove('above');
    reorderData();
}