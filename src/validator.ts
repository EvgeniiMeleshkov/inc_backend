import {NextFunction, Request, Response} from 'express';


const availableResolutionsExample = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
// export let errorsMessages: Array<any> = []
//
// export const titleValidator = (req: Request, res: Response, next: any): any => {
//   const title = req.body.title ? String(req.body.title).trim() : null
//   if (!title || title === '' || title.length > 40) {
//     errorsMessages.push(
//       {
//         message: 'не удалось загрузить видео, проверьте title',
//         field: 'title'
//       })
//   }
//   next()
// }
//
// export const authorValidator = (req: Request, res: Response, next: any): any => {
//   const author = req.body.author ? String(req.body.author).trim() : null
//   if (!author || author === '' || author.length > 20) {
//     errorsMessages.push(
//       {
//         message: 'не удалось загрузить видео, проверьте author',
//         field: 'author'
//       }
//     )
//   }
//   next()
// }
//
// export const availableResolutionValidator = (req: Request, res: Response, next: any): any => {
//   const resolutions = req.body.availableResolutions
//   if (!resolutions.every((el: any) => availableResolutionsExample.includes(el))
//     || resolutions.length > availableResolutionsExample.length || resolutions.length === 0) {
//     errorsMessages.push(
//       {
//         message: 'не удалось загрузить видео, проверьте resolution',
//         field: 'availableResolutions'
//       }
//     )
//   }
//   next()
// }
//
// export const validationHandler = (req: Request, res: Response, next: any): any => {
//   if(errorsMessages.length > 0) {
//     return (() => {
//       res.send(errorsMessages)
//       errorsMessages = []
//     })()
//   } else {
//     next()
//   }
// }


export const createVideoValidation = (req: Request, res: Response, next: NextFunction) => {
  const errorsMessages = []
  const {title, author, availableResolutions} = req.body
  if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте title',
        field: 'title'
      })
  }
  if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте author',
        field: 'author'
      }
    )
  }
  if (!availableResolutions.every((el: string) => availableResolutionsExample.includes(el))
    || availableResolutions.length > availableResolutionsExample.length || availableResolutions.length === 0) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте resolution',
        field: 'availableResolutions'
      }
    )
  }
  if (errorsMessages.length > 0) return res.status(400).send({errorsMessages: errorsMessages})
  return next()
}

export const updateVideoValidation = (req: Request, res: Response, next: NextFunction) => {
  const errorsMessages = []
  const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body

  if (!title || typeof title !== 'string' || title.length > 40) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте title',
        field: 'title'
      })
  }
  if (!author || typeof author !== 'string' || author.length > 20) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте author',
        field: 'author'
      }
    )
  }
  if (!availableResolutions.every((el: string) => availableResolutionsExample.includes(el))
    || availableResolutions.length > availableResolutionsExample.length || availableResolutions.length === 0) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте resolution',
        field: 'availableResolutions'
      }
    )
  }
  if (typeof canBeDownloaded === 'undefined' || typeof canBeDownloaded !== 'boolean') {
    errorsMessages.push({
      message: 'не удалось загрузить видео, проверьте canBeDownloaded',
      field: 'canBeDownloaded'
    })
  }
  if (!minAgeRestriction
    || (typeof minAgeRestriction !== 'number' || minAgeRestriction === null)
    || minAgeRestriction < 1
    || minAgeRestriction > 18) {
    errorsMessages.push({
      message: 'не удалось загрузить видео, проверьте minAgeRestriction',
      field: 'minAgeRestriction'
    })
  }
  if (!publicationDate || typeof publicationDate !== 'string') {
    errorsMessages.push(
      {
        message: 'не удалось загрузить видео, проверьте publicationDate',
        field: 'publicationDate'
      }
    )
  }

  if (errorsMessages.length > 0) return res.status(400).send({errorsMessages: errorsMessages})
  return next()
}