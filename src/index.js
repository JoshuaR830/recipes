const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/backdrop.html`);
});

app.get('/recipes/:uid', function(req, res, next) {
    console.log(req.params.uid);
    res.sendFile(`${__dirname}/backdrop.html`);
});

app.get('/shopping-list', function(req, res) {
    res.sendFile(`${__dirname}/backdrop.html`);
})

app.get('/login', function(req, res) {
    res.sendFile(`${__dirname}/backdrop.html`);
})

app.get('/drag-and-drop', function(req, res) {
    console.log(req.params.uid);
    res.sendFile(`${__dirname}/drag-and-drop.html`);
});

app.get('/foreground', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/partials/foreground.html`);
});

app.get('/background', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/partials/background.html`);
});

app.get('/title', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/partials/title.html`);
});

app.get('/subtitle', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/partials/subtitle.html`);
});

app.get('/image-form', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/partials/image-form.html`);
});

app.get('/image-upload', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/image.html`);
});

app.get('/shopping-list-content', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/partials/shopping-list.html`);
});

app.get('/login-content', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/partials/login.html`);
});

app.get('/schedule-content', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/partials/schedule.html`);
});


app.get('/schedule-card-practice', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/schedule-card-design.html`);
});


app.post('/fileupload', function(req, res) {
    var form = formidable.IncomingForm();
    try {
        form.parse(req, function(err, fields, files) {
            console.log(fields);
            var tempPath = files.filetoupload.path;
            console.log(tempPath);
            var permPath = `${__dirname}/public/images/` + files.filetoupload.name;
            console.log(permPath);
    
            fs.readFile(tempPath, function(err, data) {
                if (err) throw err;
    
                fs.writeFile(permPath, data, function(err) {
                    if (err) throw err;
                    // res.redirect('/');
                    console.log("File written");
                    res.end();
                });
            })
    
            fs.unlink(tempPath, function(err) {
                if (err) throw err;
                console.log('File deleted');
            })
        })
    } catch (e) {
        console.log("Oh no");
    }
    
})

app.listen(8002, () => console.log('Listening on 8002!'))