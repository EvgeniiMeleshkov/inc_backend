"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = exports.availableResolutionValidator = exports.authorValidator = exports.titleValidator = exports.errorsMessages = void 0;
const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
exports.errorsMessages = [];
const titleValidator = (req, res, next) => {
    if (!req.body.title || typeof req.body.title !== 'string' || !req.body.title.trim() || req.body.title.length > 40) {
        exports.errorsMessages.push({
            message: 'не удалось загрузить видео, проверьте title',
            field: 'title'
        });
    }
    next();
};
exports.titleValidator = titleValidator;
const authorValidator = (req, res, next) => {
    if (!req.body.author || typeof req.body.author !== 'string' || !req.body.author.trim() || req.body.author.length > 20) {
        exports.errorsMessages.push({
            message: 'не удалось загрузить видео, проверьте author',
            field: 'author'
        });
    }
    next();
};
exports.authorValidator = authorValidator;
const availableResolutionValidator = (req, res, next) => {
    if (!req.body.availableResolutions.every((el) => availableResolutions.includes(el))
        || req.body.availableResolutions.length > availableResolutions.length) {
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
        return res.send(exports.errorsMessages);
    }
    else {
        next();
    }
};
exports.validationHandler = validationHandler;
