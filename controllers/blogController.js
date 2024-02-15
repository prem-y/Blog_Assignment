// Mock blogs data
const blogs = [];
let cnt =1
const getAllBlogs = (req, res) => {
  res.json(blogs);
};

const createBlog = (req, res) => {
  const { title, content } = req.body;
  const newBlog = { id: cnt++, authorId: req.authorId, title, content };
  blogs.push(newBlog);
  res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  console.log(blogs);
};

const getBlogByAuthorId = (req, res) => {
  const authorId = parseInt(req.params.authorId);
  const authorBlogs = blogs.filter(blog => blog.authorId === authorId);
  res.json(authorBlogs);
};

const updateBlog = (req, res) => {
  const blogId = parseInt(req.params.id);
  const { title, content } = req.body;
  const blogIndex = blogs.findIndex(blog => blog.id === blogId);

  if (blogIndex === -1) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  const updatedBlog = { ...blogs[blogIndex], title, content };
  blogs[blogIndex] = updatedBlog;
  res.json({ message: 'Blog updated successfully', blog: updatedBlog });
};

const deleteBlog = (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex(blog => blog.id === blogId);

  if (blogIndex === -1) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  blogs.splice(blogIndex, 1);
  res.json({ message: 'Blog deleted successfully' });
};



module.exports = { getAllBlogs, createBlog, getBlogByAuthorId, updateBlog, deleteBlog };


