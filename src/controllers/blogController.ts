import blog from '../repo/blogRepo'
import {Response, Request} from 'express';

function get (req: Request, res: Response) {
  try {
    res.status(200).send(blog.getAll())
  }
  catch (err) {
    res.sendStatus(500)
  }
}

function post (req: Request, res: Response) {
  try {
    res.status(201).send(blog.post(req.body))
  }
  catch (err) {
    res.sendStatus(400)
  }
}

function getById (req: Request, res: Response) {
  const id = req.params.id
  try {
    res.status(200).send(blog.getById(id))
  }
  catch (err) {
    res.sendStatus(404)
  }
}

function put (req: Request, res: Response) {
  const id = req.params.id
  try {
    blog.put(id, req.body)
    res.sendStatus(204)
  }
  catch (err) {
    res.sendStatus(404)
  }
}

function deleteById (req: Request, res: Response) {
  const id = req.params.id
  try {
    blog.deleteById(id)
    res.sendStatus(204)
  }
  catch (err) {
    res.sendStatus(404)
  }
}

export default {
  get,
  post,
  getById,
  put,
  deleteById
}
