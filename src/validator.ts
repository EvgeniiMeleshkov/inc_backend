import {Request, Response} from 'express';


const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
export let errorsMessages: Array<any> = []

export const titleValidator = (req: Request, res: Response, next: any): any => {
  const title = req.body.title ? String(req.body.title).trim() : null

  if (!title || title === '' || title.length > 40) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте title',
        field: 'title'
      })
  }
  next()
}

export const authorValidator = (req: Request, res: Response, next: any): any => {
  const author = req.body.author ? String(req.body.author).trim() : null
  if (!author || author === '' || author.length > 20) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте author',
        field: 'author'
      }
    )
  }
  next()
}

export const availableResolutionValidator = (req: Request, res: Response, next: any): any => {
  if (!req.body.availableResolutions.every((el: any) => availableResolutions.includes(el))
    || req.body.availableResolutions.length > availableResolutions.length) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте resolution',
        field: 'availableResolutions'
      }
    )
  }
  next()
}

export const validationHandler = (req: Request, res: Response, next: any): any => {
  if(errorsMessages.length > 0) {
    return (() => {
      res.send(errorsMessages)
    })()
  } else {
    next()
  }
}