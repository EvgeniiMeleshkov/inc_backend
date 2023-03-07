import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import {authorValidator, availableResolutionValidator, titleValidator, validationHandler} from './validator';

const parserMiddleware = bodyParser()
const app = express()
const port = 3005

app.use(parserMiddleware)


let video = {
  'id': new Date().getDate(),
  'title': 'string',
  'author': 'string',
  'canBeDownloaded': false,
  'minAgeRestriction': null,
  'createdAt': new Date().toISOString(),
  'publicationDate': new Date().toISOString(),
  'availableResolutions': [
    'P144'
  ]
}

let videos = [video]

const addDays = function(str: Date, days: number) {
  let myDate = new Date(str);
  myDate.setDate(myDate.getDate() + days);
  return myDate;
}


app.delete('/testing/all-data', (req: Request, res: Response) => {
  try {
    res.status(204).send(videos)
  } catch (err) {
    res.send(err)
  }
})

app.get('/videos', (req: Request, res: Response) => {
  try {
    res.status(200).send(videos)
  } catch (err) {
    res.send(err)
  }
})


app.post('/videos', titleValidator,
  authorValidator,
  availableResolutionValidator, validationHandler, (req: Request, res: Response) => {    //Java, Hi!
    try {

      const now = addDays(new Date(), 1)
      const tomorrow = addDays(now, 1)

      let newVideo: any = {
        id: req.body.id ? req.body.id : +new Date(),
        title: req.body.title ? req.body.title : '',
        author: req.body.author ? req.body.author : '',
        canBeDownloaded: req.body.canBeDownloaded ? req.body.canBeDownloaded : false,
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: now.toISOString(),
        publicationDate: tomorrow.toISOString(),
        availableResolutions: req.body.availableResolutions ? req.body.availableResolutions : ["P144"]
      }
      videos.push(newVideo)
      res.status(201).json(newVideo)
    } catch (err: any) {
      res.send(err.message)
    }
  })

app.get('/videos/:id', (req: Request, res: Response):any => {
  try {
    const id = +req.params.id

    const video = videos.find((el: any) => el.id === id)

    if(video) {
      return res.status(200).send(video)
    } else {
      return res.send(404)
    }
  } catch (err: any) {
    res.status(404)
  }
})

app.put('/videos/:id', titleValidator,
  authorValidator,
  availableResolutionValidator, validationHandler, (req: Request, res: Response):any => {
    try {
      const id = +req.params.id
      let video = videos.find((el: any) => el.id === id)
      if (video) {
        video = JSON.parse(JSON.stringify(req.body))
        return res.send(204)
      } else {
        return res.send(404)
      }
    } catch (err: any) {
      res.status(400)
    }
  })

app.delete('/videos/:id', (req: Request, res: Response):any => {
  try {
    const id = +req.params.id
    let video = videos.find((el: any) => el.id === id)
    if(video) {
      videos.filter((el: any) => el.id !== id)
      return res.send(204)
    } else {
      return res.send(404)
    }

  } catch (err) {
    res.status(404)
  }
})

app.listen(port, () => {
  console.log(`server OK on port: ${port}`)
})
export default app
