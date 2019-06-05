const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.find({ _id: req.params.id })
    .populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
  res.json(user.toJSON())
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    if (!body.password) {
      return res.status(400).json({ error: 'user must have a password' })
    }
    if (body.password.length < 3) {
      return res.status(400).json({ error: 'password must be at least 3 characters long' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      blogs: []
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.put('/:id', async (request, response, next) => {

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body
    const putThis = {
      username: body.title,
      name: body.author,
      passwordHash: body.url,
      blogs: body.likes
    }
    const oldVersion = await Blog.findById(request.params.id)
    if (!oldVersion) {
      return response.status(404).json({ error: 'blog does not exist' })
    }
    const newVersion = await Blog.findByIdAndUpdate(request.params.id, putThis, { new: true })
    if (newVersion) {
      response.status(204).json(newVersion.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter