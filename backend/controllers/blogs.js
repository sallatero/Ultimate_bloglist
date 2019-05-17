const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  //Luodaan uusi Schema-olio pyynnön perusteella
  let body = request.body
  body.comments = []
  //tekee like-stringistä numeron, lisää _id:n ja comments: []
  const blog = new Blog(body)
  console.log('blogsRouter.postissa blog: ', blog)

  try {
    //Tarkistetaan että url ja title on annettu
    if(blog.title === '' || blog.title === null) {
      return response.status(400).json({ error: 'title missing' })
    }
    if(blog.url === '' || blog.url === null) {
      return response.status(400).json({ error: 'url missing' })
    }
    if (!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    console.log('decoded token: ', decodedToken)
    //Haetaan blogin lisäävä käyttäjä kannasta
    const user = await User.findById(decodedToken.id) //id: '234trwft8ru'
    console.log('etsitään user: ', user) //username, name, _id, blogs []
    //pitäiskö tässä välissä muotoilla id-kenttää??
    // Lisätään blogin user-kenttään lisäävän käyttäjän id
    blog.user = user.id

    console.log('blog with user-id: ', blog) //blog.user: id: e3423rde8
    //Talletetaan blogi kantaan
    const savedBlog = await blog.save()
    //savedBlog: _id j8j8u8, user: ou88y87y
    console.log('savedBlog: ', savedBlog)
    //savedBlogilla ei ole kenttää id, vain _id, toimii kuitenkin
    const populatedBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1, id: 1 })
    console.log('populated blog: ', populatedBlog)
    //user: {_id, username, name}

    //Lisätään blog-id käyttäjän taulukkoon blogs
    user.blogs = user.blogs.concat(savedBlog._id)
    console.log('käyttäjän blog-taulukko lisäyksen jälkeen?: ', user)
    //Talletetaan user kantaan
    const savedUser = await user.save()
    console.log('savedUser. _id?: ', savedUser) // _id

    //Tallennetaan user-olio (vain kentät username, name ja id) blogin kenttään user ja palautetaan se JSONina
    const u = savedUser.toJSON()
    console.log('u: ', u) // id 'ji9i9j9j'
    const b = savedBlog.toJSON()
    console.log('b: ', b) // id: '9i9i9i', user: 9i9i9i9i
    b.user = { username: u.username, name: u.name, id: u.id }
    console.log('B: ', b) // id: '9i9i9i', user: {username: string, name: string, id: string}
    console.log('palautetaan populatedBlog.toJSON: ', populatedBlog.toJSON())
    //edelliset b === populatedBlog.toJSON
    response.status(201).json(populatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

//request.body -> { text: "kommenttiteksti" }
//request.params.id kertoo mikä blogi
blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    console.log('request.body: ', request.body)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    //hae kannasta oikea blogi
    const blog = await Blog.findById(request.params.id)
    console.log('blogi: ', blog)
    if (!blog) {
      return response.status(404).json({ error: 'blog does not exist' })
    }
    //lisää blogin commentteihin saamasi kommentti
    const c = blog.comments
    const newC = c.concat(request.body)
    blog.comments = newC
    console.log('blogi lisäyksen jälkeen: ', blog)
    const newVersion = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    console.log('newVersion: ', newVersion)
    const newBlog = newVersion.toJSON()
    console.log('newBlog: ', newBlog)

    if(blog.user !== undefined) {
      //Haetaan käyttäjä kannasta
      const user = await User.findById(blog.user)
      console.log('user: ', user)
      const userObj = user.toJSON()
      newBlog.user = { username: userObj.username, name: userObj.name, id: userObj.id }
    }
    if (newBlog) {
      response.status(200).json(newBlog)
    } else {
      response.status(404).end()
    }

  }catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {

  try {
    //decodedToken: {username: <username>, id: <userid>}
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log('requestToken: ', request.token)
    console.log('decodedToken: ', decodedToken)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    console.log('blog: ', blog)
    if (blog.user) {
      if (blog.user.toString() !== decodedToken.id.toString()) {
        response.status(401).json({ error: 'unauthorized user' })
      }
    }
    const deletable = await Blog.findByIdAndRemove(request.params.id)

    if (deletable) {
      console.log('poistettava blogi löytyi', request.params.id)
      response.status(204).end()
    } else {
      response.status(204).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    console.log('request.params.id: ', request.params.id)
    const oldVersion = await Blog.findById(request.params.id)
    console.log('old version: ', oldVersion)
    if (!oldVersion) {
      return response.status(404).json({ error: 'blog does not exist' })
    }
    const body = request.body

    const putThis = {
      title: oldVersion.title,
      author: oldVersion.author,
      url: oldVersion.url,
      likes: body.likes,
      comments: oldVersion.comments
    }
    //const putThis = {...oldVersion, likes: body.likes}

    const newVersion = await Blog.findByIdAndUpdate(request.params.id, putThis, { new: true })
    const newBlog = newVersion.toJSON()
    //Haetaan blogin lisännyt käyttäjä kannasta JOS SE ON OLEMASSA
    if (oldVersion.user) {
      const user = await User.findById(oldVersion.user)
      const userObj = user.toJSON()
      newBlog.user = { username: userObj.username, name: userObj.name, id: userObj.id }
    }
    if (newBlog) {
      response.status(200).json(newBlog)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter