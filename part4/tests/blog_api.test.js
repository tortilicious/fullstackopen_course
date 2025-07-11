const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe} = require('node:test')
const assert = require('node:assert')
const { blogsInDB, initializeDB, nonExistingId, initialBlogs } = require('./blog_api_helper')
const app = require('../app')
const api = supertest(app)



beforeEach(async () => {
  await initializeDB()
})

describe('GET /api/blogs', () => {
  test('returns complete list of blogs as json ', async() => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDB()
    assert.strictEqual(response.body.length, blogs.length)
  })
  test('checks every blog ID its called "id"' , async() => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body
    blogs.forEach(blog => {
      assert(blog.id, 'Blog should have "id" property')
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
