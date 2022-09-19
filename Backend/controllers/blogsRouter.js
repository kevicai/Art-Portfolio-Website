const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
require("dotenv").config();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find(
    request.query.filterCond === undefined
      ? {}
      : JSON.parse(request.query.filterCond)
  )
    .sort(JSON.parse(request.query.sortCond))
    .limit(request.query.numLimit)
    .populate("user", { _id: 1, email: 1, name: 1 }); // populate user ids into user objects

  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    _id: 1,
    email: 1,
    name: 1,
  });

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user; // request.user extracted through middleware

  if (!(user && body)) {
    response.status(412).end();
  }

  const blog = new Blog({
    ...body,
    author: user.name,
    user: user.id,
    created_at: new Date().toISOString(),
  });

  const savedBlog = await blog.save();

  // update blogs stored under the user in db
  request.user.blogs = user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(savedBlog.toJSON);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const id = request.params.id;
  const blogToDelete = await Blog.findById(id);
  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== user.id) {
    return response.status(401).json({
      error: "only the creator can delete a blog",
    });
  }

  await Blog.findByIdAndRemove(id);

  user.blogs = user.blogs.filter((blog) => blog.toString() !== id);
  user.save();
  response.sendStatus(204).end();
});

blogsRouter.put("/", async (request, response) => {
  const user = request.user;
  const blog = request.body;

  if (blog.user.toString() === user.id.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(user.id, blog, {
      new: true,
    }).populate("user", { email: 1, name: 1 });

    updatedBlog
      ? response.status(200).json(updatedBlog.toJSON())
      : response.status(404).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

module.exports = blogsRouter;
