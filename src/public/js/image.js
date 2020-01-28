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

            putRecipe(name, description, imageUrl)
        }
    })

    function validType() {
        console.log("Change");
        return true;
    }
})