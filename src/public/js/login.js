var isLogin = false;

function loadLogin() {
    var foreground = document.getElementById('foreground-content-container');
    var loginContainer = document.getElementById('login-container');
    var content = document.getElementById("account-switcher");

    document.getElementById('shopping-list-reveal').style.display = 'none';
    document.getElementById('recipe-list-reveal').style.display = 'inline-block';
    document.getElementById('delete-shopping-item').style.display = 'none';
    document.getElementById('calendar-reveal').style.display = 'none';
    document.getElementById('account-switcher').style.display = 'none';

    if(!document.contains(foreground)){
        console.log("No content");
    }

    if(!loginContainer.contains(content)) {
        console.log("Had to load");
        title = document.querySelector('.title');
        foregroundRequest = new XMLHttpRequest();
        foregroundRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                console.log("hi");
                loginContainer.innerHTML = this.responseText;
                OnLoginLoaded();
            }
        };
        foregroundRequest.open("GET", `/login-content`);
        foregroundRequest.send();
    }

    var allRecipes = document.getElementById('recipe-selector-container');
    var recipe = document.getElementById('recipe-container');
    var shoppingList = document.getElementById('shopping-list-container');

    if (!location.pathname.includes('/login')) {
        history.pushState(null, null, '/login');
    }
    recipe.style.display = "none";
    allRecipes.style.display = 'none';
    shoppingList.style.display = "none";
    
    
    title.innerText = "Recipes";
    subtitle.innerText = "Log into your account";
    
    loginContainer.style.display = "inline-block";
}

function OnLoginLoaded() {
    isLogin = true;
    registerButtons = document.getElementById('register-buttons-container');
    registerButtons.style.display = "none";
    loginButtons = document.getElementById('login-buttons-container');
    loginButtons.style.display = "block";
    loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', login);
    
    registerButton = document.getElementById('register-button');
    registerButton.addEventListener('click', register);

    goToLogin = document.getElementById('go-to-login');
    goToRegister = document.getElementById('go-to-register');
    
    goToLogin.addEventListener('click', setupLogin);
    goToRegister.addEventListener('click', setupRegistration);
    document.getElementById('add-image-button').style.display = 'none';
    document.getElementById('image-input').disabled = true;

    nameInput = document.getElementById('name-input');

    nameInput.addEventListener('blur', function(name) {
        if(isLogin)
        {
            getImageRequest(nameInput.value);
        }
    })
}

function login() {
    console.log("Login attempted");
    name = document.getElementById('name-input').value;

    password = document.getElementById('password-input').value;

    console.log(name);
    console.log(password);
    attemptLogin(name, password);
}

function setupLogin() {
    isLogin = true;
    registrationContainer = document.getElementById('register-buttons-container');
    registrationContainer.style.display = "none";
    loginButtonsContainer = document.getElementById('login-buttons-container');
    loginButtonsContainer.style.display = "block";
    document.getElementById('add-image-button').style.display = 'none';
    document.getElementById('image-input').disabled = true;
}

function setupRegistration() {
    isLogin = false;
    registrationContainer = document.getElementById('register-buttons-container');
    registrationContainer.style.display = "block";
    loginButtonsContainer = document.getElementById('login-buttons-container');
    loginButtonsContainer.style.display = "none";
    var upload = document.getElementById('image-input');
    document.getElementById('add-image-button').style.display = 'inline-block';
    document.getElementById('image-input').disabled = false;

    upload.addEventListener('change', changeImage);

    document.getElementById('profile-image').src = "/images/ProfilePlaceholder.png";
}

function changeImage() {
    var upload = document.getElementById('image-input');

    var imagePreview = document.getElementById('profile-image');
    var myImage = upload.files[0];
    console.log("Hello");
    if(validType(myImage)) {
        var src = window.URL.createObjectURL(myImage);
        imagePreview.src = src;
        console.log(src);
    }
}

function validType(myImage) {
    if (myImage === undefined) {
        return false;
    }
    console.log("Change");
    return true;
}

function register() {
    
    console.log("Login attempted");


    name = document.getElementById('name-input').value;
    password = document.getElementById('password-input');
    passwordConfirmation = document.getElementById('confirm-password-input');

    console.log(name);
    console.log(password.value);
    console.log(passwordConfirmation.value);

    if(password.value === passwordConfirmation.value) {
        password.classList.remove('error');
        passwordConfirmation.classList.remove('error');
        attemptRegistration(name, password.value);
    } else {
        console.log('no match');
        password.classList.add('error');
        passwordConfirmation.classList.add('error');
    }
}

function getImageRequest(name) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://${hostname}/api/login/${name}`);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            var accountImage = document.getElementById('profile-image');
            if (data.ImageUrl != null) {
                accountImage.src = data.ImageUrl;
            } else {
                accountImage.src = "/images/ProfilePlaceholder.png";
            }
        }
    }
    xhttp.send();
}

function attemptLogin(userName, password) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://${hostname}/api/login`);
    var data = {};
    data.userName = userName;
    data.password = password;

    var json = JSON.stringify(data);

    console.log(json);

    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            console.log("It's real");
            var json = JSON.parse(this.responseText);
            if(json.Status === false) {
                console.log("Hello");
                invalidUserName();
            } else {
                console.log("Success");
                validUserName(json);
            }
        }
    }
    xhttp.send(json);
}

function attemptRegistration(userName, password, imageUrl) {

    var input = document.getElementById('image-input');
    var form = document.forms['profile-image-form'];
    var imageUrl = 'http://flatfish.online:38120/images/ProfilePlaceholder.png';
    var loginImage = input.files[0];
    if (hasImage(loginImage)) {
        imageUrl = `http://flatfish.online:38120/images/${loginImage.name}`;
        console.log("Done");
        form.submit();
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://${hostname}/api/register`);
    var data = {};
    data.userName = userName;
    data.password = password;
    data.imageUrl = imageUrl;

    var json = JSON.stringify(data);

    console.log(json);

    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            console.log("It's real");
            var data = JSON.parse(this.response);
            if(data.Status == false) {
                invalidUserName();
            } else {
                validUserName(data);
            }
        }
    }
    xhttp.send(json);
}

function invalidUserName() {
    var nameInput = document.getElementById('name-input');
    nameInput.classList.add("error");
}

function hasImage(loginImage) {
    valid = true;

    if (loginImage === undefined) {
        console.log("No image has been uploaded");
        valid = false;
    } else {
        console.log(loginImage);
        if (loginImage.size > 10000000) {
            console.log("File is too big to upload");
            valid = false;
        }
    }
    console.log("Form submitted");
    return valid;
}

function validUserName(data) {
    console.log("Data");
    console.log(data);
    document.cookie = `recipeUserId=${data.Id}`;

    var nameInput = document.getElementById('name-input');
    nameInput.classList.remove("error");

    window.history.back();
    document.getElementById('foreground').classList.add("logged-in");

    console.log("Logged in successfully");
}


function displayUserContent(data) {
    document.getElementById('login-icon').style.display = 'none';
    var loggedIn = document.getElementById('logged-in-icon');
    loggedIn.style.display = 'block';

    var accountImage = document.createElement('img');
    accountImage.src = data.ImageUrl;
    accountImage.classList.add('account-image');
    loggedIn.innerHTML = "";
    loggedIn.appendChild(accountImage);
    console.log("User data loaded");
} 


function getUserData() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://${hostname}/api/userdata`);
    var data = {};
    data.id = getCookie("recipeUserId");

    var json = JSON.stringify(data);

    console.log(json);

    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8')

    xhttp.onreadystatechange = function() {
        console.log("Request made");
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            if(json.Status === true) {
                console.log("Yippeee")
                displayUserContent(json);
            }
        }
    }
    xhttp.send(json);
}
