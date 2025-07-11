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
})

after(async () => {
  await mongoose.connection.close()
})
