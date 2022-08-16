const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
require("dotenv").config();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 }); // populate user ids into user objects

  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  // set default likes to 0 if not specified
  const blog = new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  // update blogs stored under the user in db
  request.user.blogs = user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(savedBlog.toJSON);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== user.id) {
    return response.status(401).json({
      error: "only the creator can delete a blog",
    });
  }

  await Blog.deleteOne({ _id: id });

  user.blogs = user.blogs.filter((blog) => blog.toString() !== id);
  user.save();
  response.sendStatus(204).end();

  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  if (blog.user.toString() === request.user.id.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    }).populate("user", { username: 1, name: 1 });

    updatedBlog
      ? response.status(200).json(updatedBlog.toJSON())
      : response.status(404).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

module.exports = blogsRouter;
