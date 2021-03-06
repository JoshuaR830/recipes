window.addEventListener('load', function() { 
    foreground = document.querySelector('.foreground-content-container');
    foregroundRequest = new XMLHttpRequest();
    foregroundRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            foreground.innerHTML = this.responseText;
            onImageFormLoaded();
            DragAndDrop();
        }
    };
    foregroundRequest.open("GET", `/image-form`);
    foregroundRequest.send();
});