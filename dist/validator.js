"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableResolutionValidator = exports.authorValidator = exports.titleValidator = void 0;
const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
const titleValidator = (req, res, next) => {
    if (!req.body.title || typeof req.body.title !== 'string' || !req.body.title.trim() || req.body.title.length > 40) {
        return res.status(400).json({
            errorsMessages: [
                {
                    message: 'не удалось загрузить видео, проверьте title',
                    field: 'title'
                }
            ]
        });
    }
    next();
};
exports.titleValidator = titleValidator;
const authorValidator = (req, res, next) => {
    if (!req.body.author || typeof req.body.author !== 'string' || !req.body.author.trim() || req.body.author.length > 20) {
        return res.status(400).json({
            errorsMessages: [
                {
                    message: 'не удалось загрузить видео, проверьте author',
                    field: 'author'
                }
            ]
        });
    }
    next();
};
exports.authorValidator = authorValidator;
const availableResolutionValidator = (req, res, next) => {
    if (!req.body.availableResolutions.every((el) => availableResolutions.includes(el))
        || req.body.availableResolutions.length > availableResolutions.length) {
        return res.status(400).json({
            errorsMessages: [
                {
                    message: 'не удалось загрузить видео, проверьте resolution',
                    field: 'availableResolutions'
                }
            ]
        });
    }
    next();
};
exports.availableResolutionValidator = availableResolutionValidator;
