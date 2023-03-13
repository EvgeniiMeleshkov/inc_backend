"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoRouter_1 = __importDefault(require("./routes/videoRouter"));
const blogsRouter_1 = __importDefault(require("./routes/blogsRouter"));
const postsRouter_1 = __importDefault(require("./routes/postsRouter"));
const videoRepo_1 = require("./repo/videoRepo");
const db_1 = __importDefault(require("./db/db"));
const parserMiddleware = express_1.default.json();
const app = (0, express_1.default)();
const port = 3005;
app.use(parserMiddleware);
app.delete('/testing/all-data', (req, res) => {
    try {
        videoRepo_1.videoRepo.setVideos([]);
        db_1.default.posts.documents = [];
        db_1.default.blogs.documents = [];
        res.sendStatus(204);
    }
    catch (err) {
        res.send(err);
    }
});
app.use('/videos', videoRouter_1.default);
app.use('/blogs', blogsRouter_1.default);
app.use('/posts', postsRouter_1.default);
app.listen(port, () => {
    console.log(`server OK on port: ${port}`);
});
exports.default = app;
