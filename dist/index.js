"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = require("./validator");
const parserMiddleware = express_1.default.json();
const app = (0, express_1.default)();
const port = 3005;
app.use(parserMiddleware);
let videos = [];
const addDays = function (str, days) {
    let myDate = new Date(str);
    myDate.setDate(myDate.getDate() + days);
    return myDate;
};
app.delete('/testing/all-data', (req, res) => {
    try {
        videos = [];
        res.sendStatus(204);
    }
    catch (err) {
        res.send(err);
    }
});
app.get('/videos', (req, res) => {
    try {
        res.status(200).send(videos);
    }
    catch (err) {
        res.send(err);
    }
});
app.post('/videos', validator_1.createVideoValidation, (req, res) => {
    try {
        const now = new Date();
        const tomorrow = addDays(now, 1);
        let newVideo = {
            id: +now,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: now.toISOString(),
            publicationDate: tomorrow.toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        videos.push(newVideo);
        res.status(201).send(newVideo);
    }
    catch (err) {
        res.send(err.message);
    }
});
app.get('/videos/:id', (req, res) => {
    try {
        const id = +req.params.id;
        const video = videos.find((el) => el.id === id);
        if (video) {
            return res.status(200).send(video);
        }
        else {
            return res.sendStatus(404);
        }
    }
    catch (err) {
        res.sendStatus(404);
    }
});
app.put('/videos/:id', validator_1.updateVideoValidation, (req, res) => {
    try {
        const id = +req.params.id;
        const video = videos.find((el) => el.id === id);
        if (!video)
            return res.sendStatus(404);
        video.title = req.body.title;
        video.author = req.body.author;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate;
        video.availableResolutions = req.body.availableResolutions;
        return res.sendStatus(204);
    }
    catch (err) {
        res.sendStatus(400);
    }
});
app.delete('/videos/:id', (req, res) => {
    try {
        const id = +req.params.id;
        let video = videos.find((el) => el.id === id);
        if (video) {
            videos = videos.filter((el) => el.id !== id);
            return res.sendStatus(204);
        }
        else {
            return res.sendStatus(404);
        }
    }
    catch (err) {
        res.status(404);
    }
});
app.listen(port, () => {
    console.log(`server OK on port: ${port}`);
});
exports.default = app;
