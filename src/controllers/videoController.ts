import {Request, Response} from 'express';
import {addDays} from '../utils/addDay';
import {videoRepo, VideoType} from '../repo/videoRepo';

const videos = videoRepo.getVideos()

export const getVideos = (req: Request, res: Response) => {
  try {
    res.status(200).send(videos)
  } catch (err) {
    res.send(err)
  }
}

export const createVideo = (req: Request, res: Response) => {    //Java, Hi!
  try {
    const now = new Date()
    const tomorrow = addDays(now, 1)

    let newVideo: any = {
      id: +now,
      title: req.body.title,
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
}

export const getOneVideo = (req: Request, res: Response): any => {
  try {
    const id = +req.params.id
    const video = videos.find((el: VideoType) => el.id === id)

    if (video) {
      return res.status(200).send(video)
    } else {
      return res.sendStatus(404)
    }
  } catch (err: any) {
    res.sendStatus(404)
  }
}

export const updateVideo = (req: Request, res: Response): any => {
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
}

export const removeVideo = (req: Request, res: Response): any => {
  try {
    const id = +req.params.id
    let video = videos.find((el: VideoType) => el.id === id)
    if (!video) return res.sendStatus(404)
    videoRepo.setVideos(videos.filter((el: VideoType) => el.id !== video?.id))
    return res.sendStatus(204)

  } catch (err) {
    res.sendStatus(404)
  }
}
