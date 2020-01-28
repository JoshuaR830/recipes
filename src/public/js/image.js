window.addEventListener('load', function() {
    var input = document.getElementById('image-input');
    var preview = document.getElementById('preview');

    input.addEventListener('change', function() {
        preview.innerHTML = "";
        var myImage = input.files;
        if(validType(myImage[0])) {
            console.log(myImage[0].name);
            var imagePreview = document.createElement('img');
            imagePreview.src = window.URL.createObjectURL(myImage[0]);
            preview.appendChild(imagePreview);
            
            var name = document.getElementById('recipe-name').value;
            var description = document.getElementById('recipe-description').value;
            var imageUrl = `http://flatfish.online:38120/images/${myImage[0].name}`;

            postRecipe(name, description, imageUrl)
        }
    })


    function postRecipe(name, description, imageUrl) {
        console.log("Hi");
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:5000/api/addrecipe");
        var data = {};
        data.name = name;
        data.description = description;
        data.imageUrl = imageUrl;

    
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
})