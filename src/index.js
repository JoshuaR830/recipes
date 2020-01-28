const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
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

app.get('/image-upload', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.sendFile(`${__dirname}/image.html`);
});

app.post('/fileupload', function(req, res) {
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var tempPath = files.filetoupload.path;
        console.log(tempPath);
        var permPath = '/public/images/uploads' + files.filetoupload.name;
        console.log(permPath);
        fs.rename(tempPath, permPath, function(err) {
            if (err) throw err;
            res.write('File uploaded and moved');
            res.end();
        })
        
    })
})

app.listen(8002, () => console.log('Listening on 8002!'))