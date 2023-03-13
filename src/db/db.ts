

const blogs = {
  documents: [],
  getAll () {
    return this.documents
  },
  post (payload: any) {
    payload.id = Date.now().toString()
    //@ts-ignore
    this.documents.push(payload)
    return payload
  },
  getById (id: string) {
    const blog = this.documents.find((x: any) => x.id === id)
    if(!blog) throw new Error('Not found')
    return blog
  },
  put (id: string, payload: any) {
    let doc = this.getById(id)
    //@ts-ignore
    doc = {...doc, ...payload}
  },
  deleteById (id: string) {
    const doc: any = this.getById(id)
    this.documents = this.documents.filter((x: any)=> x.id !== doc.id)
  }
}

const posts = {
  documents: [],
  getAll () {
    return this.documents
  },
  post (payload: any): any {
    payload.id = Date.now().toString()
    const blog: any = blogs.documents.find((x: any) => x.id === payload.blogId)
    if(!blog) throw new Error('Not existing blog')
    payload.blogName = blog.name
    //@ts-ignore
    this.documents.push(payload)
    return payload
  },
  getById (id: string) {
    const post = this.documents.find((x: any)=>x.id === id)
    if(!post) throw new Error('Not found')
    return post
  },
  put (id: string, payload: any) {
    let post = this.getById(id)
    //@ts-ignore
    post = {...post, ...payload}
  },
  deleteById (id: string) {
    const post: any = this.getById(id)
    this.documents = this.documents.filter((x: any)=>x.id !== post.id)
  }
}

export default {
  blogs,
  posts
}