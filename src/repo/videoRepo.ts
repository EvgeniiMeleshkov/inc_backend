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


export const videoRepo = {
  getVideos () {
    return videos
  },
  setVideos (newVideos: Array<VideoType>) {
    videos = newVideos
  }
}