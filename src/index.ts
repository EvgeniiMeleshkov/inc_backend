import express, {Request, Response} from 'express'
import videoRouter from './routes/videoRouter'
import blogs from './routes/blogsRouter'
import posts from './routes/postsRouter'
import {videoRepo} from './repo/videoRepo';
import db from './db/db';

const parserMiddleware = express.json()
const app = express()
const port = 3005

app.use(parserMiddleware)



app.delete('/testing/all-data', (req: Request, res: Response) => {
  try {
    videoRepo.setVideos([])
    db.posts.documents = []
    db.blogs.documents = []
    res.sendStatus(204)
  } catch (err) {
    res.send(err)
  }
})


app.use('/videos', videoRouter)
app.use('/blogs', blogs)
app.use('/posts', posts)

app.listen(port, () => {
  console.log(`server OK on port: ${port}`)
})


export default app
