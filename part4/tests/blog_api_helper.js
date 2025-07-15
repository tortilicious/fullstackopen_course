const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  }
]

const createInitialUsers = async () => {
  return [
    {
      name: "Michael Chan",
      username: "mchan",
      hashedPassword: await bcrypt.hash("password123", 10)
    },
    {
      name: "Edsger Dijkstra",
      username: "edijkstra",
      hashedPassword: await bcrypt.hash("secret456", 10)
    }
  ]
}

const clearDB = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
}

const initializeDB = async () => {
  await clearDB()
  const initialUsers = await createInitialUsers()
  await Blog.insertMany(initialBlogs)
  await User.insertMany(initialUsers)
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'temporary blog',
    author: 'temp author',
    url: 'http://temp.com',
    likes: 0
  })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  createInitialUsers,
  blogsInDB,
  usersInDB,
  clearDB,
  initializeDB,
  nonExistingId,
}