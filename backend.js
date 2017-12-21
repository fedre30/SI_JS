const express = require('express');
const fs = require('fs');
const multer = require('multer');
const thumbsupply = require('thumbsupply');
const process = require('process');
const path = require('path');
const getDuration = require('get-video-duration');

const app = express();
var storage = multer.diskStorage({
    destination: process.cwd() + '/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

if (false === fs.existsSync('public/img/miniatures/uploads/')) {
    fs.mkdirSync('public/img/miniatures/uploads/');
}

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
function formatTime(time) {
    if (time < 1) return '00:00';

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time / 60) % 60); // modulo 60 is useful if the time is longer than one hour
    const seconds = Math.floor(time % 60);

    let formattedTime = "";

    if (hours !== 0) {
        formattedTime += hours + ':';
    }

    formattedTime += minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

    return formattedTime;
}

app.post('/upload', upload.single('video'), function(req, res) {
    getDuration(req.file.path)
        .then((duration) => {
            const formattedDuration = formatTime(Math.floor(duration));
            thumbsupply.generateThumbnail(req.file.path, {size: thumbsupply.ThumbSize.LARGE, timestamp: "10%"})
            .then(thumb => {
                const thumbPath = 'public/img/miniatures/uploads/' + path.basename(req.file.path) + '.png';
                fs.renameSync(thumb, thumbPath);

                addVideo({
                    src: 'uploads/' + req.file.filename,
                    img: 'uploads/' + path.basename(req.file.path) + '.png',
                    title: req.body.title,
                    duration: formattedDuration,
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
            })
        })
});

// Step 4: specify where static files are located and start server
app.use(express.static('public'));
app.use('/videos/uploads', express.static('uploads', {
    setHeaders(res) {
        // HOTFIX: Chrome requires the video mime to be set in the headers
        res.set('Content-Type', 'video/mp4');
    }
}));


app.listen(3000);