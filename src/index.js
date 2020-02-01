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

app.post('/fileupload', function(req, res) {
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        var tempPath = files.filetoupload.path;
        console.log(tempPath);
        var permPath = '/public/images/' + files.filetoupload.name;
        console.log(permPath);

        fs.readFile(tempPath, function(err, data) {
            if (err) throw err;

            fs.writeFile(permPath, data, function(err) {
                if (err) throw err;
                res.redirect('/');
                console.log("File written");
                res.end();
            });
        })

        fs.unlink(tempPath, function(err) {
            if (err) throw err;
            console.log('File deleted');
        })
        
    })
})

app.listen(8002, () => console.log('Listening on 8002!'))