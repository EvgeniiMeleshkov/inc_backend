import {NextFunction, Request, Response} from 'express';
import db from '../db/db';


const availableResolutionsExample = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']


export const postValidation = (req: Request, res: Response, next: NextFunction) => {
  const errorsMessages = []
  const {title, shortDescription, content, blogId} = req.body

  if(!title || typeof title !== 'string' || title.length > 30) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить пост, проверьте title',
        field: 'title'
      }
    )
  }

  if(!shortDescription
    || typeof shortDescription !== 'string'
    || shortDescription.length > 100) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить пост, проверьте shortDescription',
        field: 'shortDescription'
      }
    )
  }

  if(!content || typeof content !== 'string' || content.length > 1000) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить пост, проверьте content',
        field: 'content'
      }
    )
  }

  if(!blogId || typeof blogId !== 'string' || db.blogs.documents.find((x: any)=> x.id !== blogId)) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить пост, проверьте blogId',
        field: 'blogId'
      }
    )
  }

  if (errorsMessages.length > 0) return res.status(400).send({errorsMessages: errorsMessages})
  return next()
}


export const blogValidation = (req: Request, res: Response, next: NextFunction) => {
  const errorsMessages = []
  const {name, description, websiteUrl} = req.body

  if(!name || typeof name !== 'string' || name.length > 15) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить пост, проверьте name',
        field: 'name'
      }
    )
  }
  if(!description || typeof description !== 'string' || description.length > 500) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить пост, проверьте description',
        field: 'description'
      }
    )
  }
  if(!websiteUrl
    || typeof websiteUrl !== 'string'
    || websiteUrl.length > 100
    || !websiteUrl.match(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
  ) {
    errorsMessages.push(
      {
        message: 'не удалось загрузить пост, проверьте websiteUrl',
        field: 'websiteUrl'
      }
    )
  }
  if (errorsMessages.length > 0) return res.status(400).send({errorsMessages: errorsMessages})
  return next()
}

export const createVideoValidation = (req: Request, res: Response, next: NextFunction) => {
  const errorsMessages = []
  const {title, author, availableResolutions} = req.body
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