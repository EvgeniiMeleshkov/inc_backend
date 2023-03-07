"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = exports.availableResolutionValidator = exports.authorValidator = exports.titleValidator = exports.errorsMessages = void 0;
const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
exports.errorsMessages = [];
const titleValidator = (req, res, next) => {
    const title = req.body.title ? String(req.body.title).trim() : null;
    if (!title || title === '' || title.length > 40) {
        exports.errorsMessages.push({
            message: 'не удалось загрузить видео, проверьте title',
            field: 'title'
        });
    }
    next();
};
exports.titleValidator = titleValidator;
const authorValidator = (req, res, next) => {
    const author = req.body.author ? String(req.body.author).trim() : null;
    if (!author || author === '' || author.length > 20) {
        exports.errorsMessages.push({
            message: 'не удалось загрузить видео, проверьте author',
            field: 'author'
        });
    }
    next();
};
exports.authorValidator = authorValidator;
const availableResolutionValidator = (req, res, next) => {
    const resolutions = req.body.availableResolutions;
    if (!resolutions.every((el) => availableResolutions.includes(el))
        || resolutions.length > availableResolutions.length || resolutions.length === 0) {
        exports.errorsMessages.push({
            message: 'не удалось загрузить видео, проверьте resolution',
            field: 'availableResolutions'
        });
    }
    next();
};
exports.availableResolutionValidator = availableResolutionValidator;
const validationHandler = (req, res, next) => {
    if (exports.errorsMessages.length > 0) {
        return (() => {
            res.send(exports.errorsMessages);
        })();
    }
    else {
        next();
    }
};
exports.validationHandler = validationHandler;
