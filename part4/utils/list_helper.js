const lodash = require('lodash')


const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
      ? null
      : blogs.reduce((max, current) =>
          current.likes > max.likes ? current : max
      )
}

// return the autor with most blogs {author:'NAME': blogs: NUMBER} or null
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = blogs.reduce((numberOfBlogs, currentBlog) => {
    numberOfBlogs[currentBlog.author] = (numberOfBlogs[currentBlog.author] || 0) + 1
    return numberOfBlogs  // ← Esto faltaba
  }, {})

  let maxAuthor = null
  let maxBlogs = 0

  for (const author in authorCounts) {
    if (authorCounts[author] > maxBlogs) {
      maxBlogs = authorCounts[author]
      maxAuthor = author
    }
  }
  return { author: maxAuthor, blogs: maxBlogs }
}


const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes  // ✅ Corregido: retorna 'likes'
  }, {})

  let maxAuthor = null
  let maxLikes = 0

  for (const author in authorLikes) {  // ✅ Corregido: 'in' para claves
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author]
      maxAuthor = author
    }
  }
  return {author: maxAuthor, likes: maxLikes}
}


// return the author with most likes {author: 'name', likes: number}
module.exports = {totalLikes, favoriteBlog, mostBlogs, mostLikes};

