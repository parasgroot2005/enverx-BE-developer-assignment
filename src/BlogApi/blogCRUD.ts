import express from "express";
import { Blog } from "../models/blog";
import { BlogModel } from "../models/blogData";
import { Joi, celebrate, Segments } from "celebrate";
import cors from "cors";

const router = express.Router();

router.use(
  cors({
    origin: "http://127.0.0.1:3000",
  })
);

const blogSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  isPublished: Joi.boolean().required(),
  });


router.post(
  "/posts",
  celebrate({ [Segments.BODY]: blogSchema }),
  async (req, res) => {
    const {
      title,
      author,
      content,
      createdAt,
      updatedAt,
      tags,
      isPublished,
      
    } = req.body;
    const newData = new BlogModel({
      title,
      author,
      content,
      createdAt,
      updatedAt,
      tags,
      isPublished,
      views:0,
    });
    try {
      const createdData: Blog = await newData.save();
      console.log(createdData);
      res.json(createdData);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
);

router.get("/posts", async (req, res) => {
  try {
    const blog = await BlogModel.find();
    console.log(blog);
    res.json(blog);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogModel.findOne({ _id:id});
    console.log(post);
    res.json(post);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/posts/:id",  async (req, res) => {
  const { id } = req.params;
  try {
    const post: Blog = (await BlogModel.findOneAndUpdate({ _id:id }, req.body, {
      new: true,
    })) as Blog;
    console.log(post);
    res.json(post);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

router.patch("/posts/count/:id",  async (req, res) => {
    const { id } = req.params;
    try {
        const post:any = await BlogModel.findOne({ _id:id });
      console.log(post);
      post.views = post.views+1
      const blog: Blog = (await BlogModel.findByIdAndUpdate({ _id:id }, post, {
        new: true,
      })) as Blog;
      res.json(blog);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  });

router.delete("/posts/:id", async (req, res) => {
    const {id} = req.params
  try {
    const blog: Blog = (await BlogModel.findOneAndDelete({
      _id:id
    })) as Blog;
    console.log(blog);
    res.json("success");
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
