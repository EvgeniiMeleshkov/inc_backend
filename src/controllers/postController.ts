import {Request, Response} from 'express';
import posts from '../repo/postRepo'

function get (req: Request, res: Response) {
  try {
    res.status(200).send(posts.getAll())
  }
  catch (err) {
    res.sendStatus(500)
  }
}

function post (req: Request, res: Response) {
  try {
    res.status(201).send(posts.post(req.body))
  }
  catch (err) {
    res.sendStatus(500)
  }
}

function getById (req: Request, res: Response) {
  const id = req.params.id
  try {
    res.status(200).send(posts.getById(id))
  }
  catch (err) {
    res.sendStatus(404)
  }
}

function put (req: Request, res: Response) {
  const id = req.params.id
  try {
    posts.put(id, req.body)
    res.sendStatus(204)
  }
  catch (err) {
    res.sendStatus(404)
  }
}

function deleteById (req: Request, res: Response) {
  const id = req.params.id
  try {
    posts.deleteById(id)
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