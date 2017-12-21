const express = require('express');
const fs = require('fs');
const multer = require('multer');
const thumbsupply = require('thumbsupply');

const app = express();
const upload = multer({
    dest: 'uploads/',
    preservePath: false,
});

// Step 1: parse data.js
const videosData = require('./data.js');

function addVideo(videoMetadata)
{
    // TODO: checker les valeurs de videoMetadata
    videosData.films.push(videoMetadata);
}

// Step 2: respond to data.js request
app.get('/data.js', function(req, res) {
    res.set('Content-Type', 'application/javascript');
    res.send('var data = ' + JSON.stringify(videosData));
});

// Step3: allow users to upload videos
app.post('/upload', upload.single('video'), function(req, res) {
    addVideo({
        src: 'uploads/' + req.file.filename,
        img: 'custom.jpg',
        title: req.body.title,
        duration: '59:59',
        author: req.body.author,
        author_url: 'http://localhost:3000/',
        description: req.body.description,
        year: parseInt(req.body.year),
        audio_language: 'N/A',
        sub_language: 'N/A',
        rating: 0,
        category: req.body.category,
    });
    res.redirect('/');
});

// Step 4: specify where static files are located and start server
app.use(express.static('public'));
app.use('/uploads', express.static('uploads', {
    setHeaders(res) {
        // HOTFIX: Chrome requires the video mime to be set in the headers
        res.set('Content-Type', 'video/mp4');
    }
}));


app.listen(3000);