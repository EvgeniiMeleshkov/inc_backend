import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import {authorValidator, availableResolutionValidator, titleValidator} from './validator';

const parserMiddleware = bodyParser()
const app = express()
const port = 3005

app.use(parserMiddleware)


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
}

let videos = [video]


app.delete('/testing/all-data', (req: Request, res: Response) => {
  try {
    res.status(204).send(videos)
  } catch (err) {
    res.send(err)
  }
})

app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).send(videos)
  } catch (err) {
    res.send(err)
  }
})


app.post('/videos', titleValidator,
  authorValidator,
  availableResolutionValidator, (req: Request, res: Response) => {    //Java, Hi!
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
      }
      videos.push(newVideo)
      res.status(201).json(videos)
    } catch (err: any) {
      res.send(err.message)
    }
  })

app.get('/videos/:id', (req: Request, res: Response):any => {
  try {
    const id = +req.params.id

    const video = videos.find(el => el.id === id)

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
  availableResolutionValidator, (req: Request, res: Response):any => {
    try {
      const id = +req.params.id
      let video = videos.find(el => el.id === id)
      if (video) {
        video = JSON.parse(JSON.stringify(req.body))
        return res.status(200).send([video])
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
    let video = videos.find(el => el.id === id)
    if(video) {
      videos.filter(el => el.id !== id)
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
