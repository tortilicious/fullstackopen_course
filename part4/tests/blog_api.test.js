const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, beforeEach, after, describe} = require('node:test')
const assert = require('node:assert')
const { blogsInDB, initializeDB, nonExistingId, initialBlogs } = require('./blog_api_helper')
const app = require('../app')
const {runInContext: list} = require("lodash");
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

describe('POST /api/blogs', () => {
  test('increases collection length by 1', async() => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'testurl',
      likes: 10
    }

    const initialBlogs = await blogsInDB()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const finalBlogs = await blogsInDB()
    assert.strictEqual(finalBlogs.length, initialBlogs.length + 1)
  })
  test('checks last POST saves the Blog', async() => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'testurl',
      likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogs = await blogsInDB()
    const lastBlog = blogs[blogs.length - 1]

    assert.strictEqual(lastBlog.title, newBlog.title)
    assert.strictEqual(lastBlog.author, newBlog.author)
    assert.strictEqual(lastBlog.url, newBlog.url)
    assert.strictEqual(lastBlog.likes, newBlog.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})
