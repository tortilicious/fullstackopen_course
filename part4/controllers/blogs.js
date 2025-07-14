const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {new: true, runValidators: true})

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    return response.status(404).json({ error: 'blog not found' })
  }
})

module.exports = blogsRouter