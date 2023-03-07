"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const validator_1 = require("./validator");
const parserMiddleware = (0, body_parser_1.default)();
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
        res.status(204).send(videos);
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
app.post('/videos', validator_1.titleValidator, validator_1.authorValidator, validator_1.availableResolutionValidator, validator_1.validationHandler, (req, res) => {
    try {
        const now = new Date();
        const tomorrow = addDays(now, 1);
        let newVideo = {
            id: req.body.id ? req.body.id : +new Date(),
            title: req.body.title ? req.body.title : '',
            author: req.body.author ? req.body.author : '',
            canBeDownloaded: req.body.canBeDownloaded ? req.body.canBeDownloaded : false,
            minAgeRestriction: req.body.minAgeRestriction,
            createdAt: now.toISOString(),
            publicationDate: tomorrow.toISOString(),
            availableResolutions: req.body.availableResolutions ? req.body.availableResolutions : ["P144"]
        };
        videos.push(newVideo);
        res.status(201).json(newVideo);
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
            return res.send(404);
        }
    }
    catch (err) {
        res.status(404);
    }
});
app.put('/videos/:id', validator_1.titleValidator, validator_1.authorValidator, validator_1.availableResolutionValidator, validator_1.validationHandler, (req, res) => {
    try {
        const id = +req.params.id;
        let video = videos.find((el) => el.id === id);
        if (video) {
            video = JSON.parse(JSON.stringify(req.body));
            return res.send(204);
        }
        else {
            return res.send(404);
        }
    }
    catch (err) {
        res.status(400);
    }
});
app.delete('/videos/:id', (req, res) => {
    try {
        const id = +req.params.id;
        let video = videos.find((el) => el.id === id);
        if (video) {
            videos.filter((el) => el.id !== id);
            return res.send(204);
        }
        else {
            return res.send(404);
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
