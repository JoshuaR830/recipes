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
        }
    })

    function validType() {
        console.log("Change");
        return true;
    }
})