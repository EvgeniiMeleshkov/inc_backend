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
let video = {
    'id': 0,
    'title': 'string',
    'author': 'string',
    'canBeDownloaded': true,
    'minAgeRestriction': null,
    'createdAt': '2023-03-06T03:33:49.753Z',
    'publicationDate': '2023-03-06T03:33:49.753Z',
    'availableResolutions': [
        'P144'
    ]
};
let videos = [video];
app.delete('/testing/all-data', (req, res) => {
    try {
        res.status(204).send(videos);
    }
    catch (err) {
        res.send(err);
    }
});
app.get('/', (req, res) => {
    try {
        res.status(200).send(videos);
    }
    catch (err) {
        res.send(err);
    }
});
app.post('/videos', validator_1.titleValidator, validator_1.authorValidator, validator_1.availableResolutionValidator, (req, res) => {
    try {
        let newVideo = {
            id: +new Date(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        videos.push(newVideo);
        res.status(201).json(videos);
    }
    catch (err) {
        res.send(err.message);
    }
});
app.get('/videos/:id', (req, res) => {
    try {
        const id = +req.params.id;
        const video = videos.find(el => el.id === id);
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
app.put('/videos/:id', validator_1.titleValidator, validator_1.authorValidator, validator_1.availableResolutionValidator, (req, res) => {
    try {
        const id = +req.params.id;
        let video = videos.find(el => el.id === id);
        if (video) {
            video = JSON.parse(JSON.stringify(req.body));
            return res.status(200).send([video]);
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
        let video = videos.find(el => el.id === id);
        if (video) {
            videos.filter(el => el.id !== id);
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
