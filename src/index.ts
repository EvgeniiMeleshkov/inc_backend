import express, {Request, Response} from 'express'
import {createVideoValidation, updateVideoValidation} from './validator';

const parserMiddleware = express.json()
const app = express()
const port = 3005

app.use(parserMiddleware)

export type VideoType = {
  id: number,
  title: string,
  author: string,
  canBeDownloaded: boolean,
  minAgeRestriction: null | number,
  createdAt: string,
  publicationDate: string,
  availableResolutions: string[]
}

let videos: VideoType[] = []

const addDays = function(str: Date, days: number) {
  let myDate = new Date(str);
  myDate.setDate(myDate.getDate() + days);
  return myDate;
}


app.delete('/testing/all-data', (req: Request, res: Response) => {
  try {
    videos = []
    res.sendStatus(204)
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

app.post('/videos', createVideoValidation, (req: Request, res: Response) => {    //Java, Hi!
    try {
      const now = new Date()
      const tomorrow = addDays(now, 1)

      let newVideo: any = {
        id: +now,
        title: req.body.title ,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: now.toISOString(),
        publicationDate: tomorrow.toISOString(),
        availableResolutions: req.body.availableResolutions
      }
      videos.push(newVideo)
      res.status(201).send(newVideo)
    } catch (err: any) {
      res.send(err.message)
    }
  })

app.get('/videos/:id', (req: Request, res: Response):any => {
  try {
    const id = +req.params.id
    const video = videos.find((el: VideoType) => el.id === id)

    if(video) {
      return res.status(200).send(video)
    } else {
      return res.sendStatus(404)
    }
  } catch (err: any) {
    res.sendStatus(404)
  }
})

app.put('/videos/:id', updateVideoValidation, (req: Request, res: Response):any => {
    try {
      const id = +req.params.id
      const video = videos.find((el: VideoType) => el.id === id)
      if (!video) return res.sendStatus(404)
      video.title = req.body.title
      video.author = req.body.author
      video.canBeDownloaded = req.body.canBeDownloaded
      video.minAgeRestriction = req.body.minAgeRestriction
      video.publicationDate = req.body.publicationDate
      video.availableResolutions = req.body.availableResolutions
      return res.sendStatus(204)
    } catch (err: any) {
      res.sendStatus(400)
    }
  })

app.delete('/videos/:id', (req: Request, res: Response):any => {
  try {
    const id = +req.params.id
    let video = videos.find((el: VideoType) => el.id === id)
    if(video) {
      videos.filter((el: VideoType) => el.id !== id)
      return res.sendStatus(204)
    } else {
      return res.sendStatus(404)
    }

  } catch (err) {
    res.status(404)
  }
})

app.listen(port, () => {
  console.log(`server OK on port: ${port}`)
})


export default app
