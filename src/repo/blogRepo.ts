import db from '../db/db'

function getAll () {
  return db.blogs.getAll()
}

function post (payload: any) {
  return db.blogs.post(payload)
}

function getById (id: string) {
  return db.blogs.getById(id)
}

function put (id: string, payload: any) {
  return db.blogs.put(id, payload)
}

function deleteById (id: string) {
  return db.blogs.deleteById(id)
}

export default {
  getAll,
  post,
  getById,
  put,
  deleteById
}