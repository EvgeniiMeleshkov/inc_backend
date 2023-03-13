import db from '../db/db'

function getAll () {
  return db.posts.getAll()
}

function post (payload: any) {
  return db.posts.post(payload)
}

function getById (id: string) {
  return db.posts.getById(id)
}

function put (id: string, payload: any) {
  return db.posts.put(id, payload)
}

function deleteById (id: string) {
  return db.posts.deleteById(id)
}

export default {
  getAll,
  post,
  getById,
  put,
  deleteById
}