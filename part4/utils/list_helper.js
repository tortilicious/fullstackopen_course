
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

module.exports = {totalLikes, favoriteBlog}