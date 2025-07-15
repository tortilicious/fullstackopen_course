const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const {test, beforeEach, after, describe} = require('node:test')
const assert = require('node:assert')
const {blogsInDB, initializeDB, clearDB, usersInDB} = require('./blog_api_helper')
const app = require('../app')
const User = require("../models/user");
const api = supertest(app)


beforeEach(async () => {
  await initializeDB()
})

describe('GET /api/blogs', () => {
  test('returns complete list of blogs as json ', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDB()
    assert.strictEqual(response.body.length, blogs.length)
  })
  test('checks every blog ID its called "id"', async () => {
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
  test('increases collection length by 1', async () => {
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
  test('checks last POST saves the Blog', async () => {
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
  test('checks saving a blog without "likes" returns it with "likes = 0"', async () => {
    const blogWithoutLikes = {
      title: 'test title',
      author: 'test author',
      url: 'testurl'
    }
    const blogResponse = await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)

    assert.strictEqual(blogResponse.body.likes, 0)
  })
  test('checks saving a blog without "url" or "title" returns "400 Bad Request"', async () => {
    const blogWithoutTitleUrl = {
      author: 'test author',
      likes: 10
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutTitleUrl)
        .expect(400)
  })
})

describe('PUT /api/blogs/blogId', () => {
  test('updates a blog when endpoint has an existing id', async () => {
    const blogs = await blogsInDB()
    const firstBlog = blogs[0]
    const firstBlogId = firstBlog.id

    const bodyRequest = {likes: 2000}

    const response = await api
        .put(`/api/blogs/${firstBlogId}`)
        .send(bodyRequest)
        .expect(200)

    const updatedBlog = response.body

    assert.strictEqual(response.body.title, firstBlog.title)
    assert.strictEqual(response.body.likes, bodyRequest.likes)
    assert.strictEqual(response.body.author, firstBlog.author)
    assert.strictEqual(response.body.url, firstBlog.url)
  })

  test('fail to update a blog when endpoint has a non existing id', async () => {
    const response = await api
        .put('/api/blogs/507f1f77bcf86cd799439011')
        .send({author: 'changing-author'})
        .expect(404)

    assert.deepStrictEqual(response.body, {error: 'blog not found'})
  })

  test('fail to update a blog when endpoint has malformated id', async () => {
    const response = await api
        .put('/api/blogs/123')
        .send({author: 'changing-author'})
        .expect(400)

    assert.deepStrictEqual(response.body, {error: 'malformatted id'})
  })
})

describe('POST /api/users', () => {
  test('increases collection by 1 when new user is added', async () => {
    const currentUsers = await usersInDB()
    const testUser = {
      name: 'test name',
      username: 'test username',
      password: 'test password'
    }

    await api.post('/api/users')
        .send(testUser)
        .expect(201)

    const updatedUsers = await usersInDB()
    assert.strictEqual(updatedUsers.length, currentUsers.length + 1)
  })
  test('response fields matches new User added to DB', async () => {
    const newUser = {
      name: 'test name',
      username: 'test username',
      password: 'test password'
    }

    const response = await api.post('/api/users')
        .send(newUser)
        .expect(201)

    assert(response.body)
    assert(!response.body.hashedPassword)
    assert.strictEqual(response.body.name, newUser.name)
    assert.strictEqual(response.body.username, newUser.username)


    assert(response.body.id)
    assert(!response.body.password)
    assert(!response.body._id)
    assert(!response.body.__v)
  })
  test('new User is added to DB', async () => {
    const newUser = {
      name: 'test name',
      username: 'test username',
      password: 'test password'
    }

    const response = await api.post('/api/users').send(newUser).expect(201)
    const newUserId = response.body.id

    const userInDb = await User.findById(newUserId)
    assert(userInDb)
    assert.strictEqual(userInDb.name, newUser.name)
  })
  test('fails to post an User with an already taken username', async () => {
    const newUser = {
      name: 'test name',
      username: 'mchan',
      password: 'test password'
    }

    const response = await api.post('/api/users').send(newUser).expect(400)
    assert(response.body.error.includes('Username already exists'))
  })
  test('fails to post an User with a short password', async () => {
    const newUser = {
      name: 'test name',
      username: 'test username',
      password: 'te'
    }

    const response = await api.post('/api/users').send(newUser).expect(400)
    assert(response.body.error.includes('Password must be at least 3 characters'))
  })
  test('fails to post an User with no password', async () => {
    const newUser = {
      name: 'test name',
      username: 'test username',
    }

    const response = await api.post('/api/users').send(newUser).expect(400)
    assert(response.body.error.includes('Password is required'))
  })
})

after(async () => {
  await mongoose.connection.close()
})


