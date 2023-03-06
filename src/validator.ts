import {Request, Response} from 'express';


const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']


export const titleValidator = (req: Request, res: Response, next: any): any => {
  if (!req.body.title || typeof req.body.title !== 'string' || !req.body.title.trim() || req.body.title.length > 40) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: 'не удалось загрузить видео, проверьте title',
          field: 'title'
        }
      ]
    })
  }
  next()
}

export const authorValidator = (req: Request, res: Response, next: any): any => {
  if (!req.body.author || typeof req.body.author !== 'string' || !req.body.author.trim() || req.body.author.length > 20) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: 'не удалось загрузить видео, проверьте author',
          field: 'author'
        }
      ]
    })
  }
  next()
}

export const availableResolutionValidator = (req: Request, res: Response, next: any): any => {
  if (!req.body.availableResolutions.every((el: any) => availableResolutions.includes(el))
    || req.body.availableResolutions.length > availableResolutions.length) {
    return res.status(400).json({
      errorsMessages: [
        {
          message: 'не удалось загрузить видео, проверьте resolution',
          field: 'availableResolutions'
        }
      ]
    })
  }
  next()
}