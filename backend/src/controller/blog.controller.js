import Blog from "../models/blog.model.js";
import generateUniqueSlug from "../utils/generateUniqueSlug.js";

const createBlog = async (req, res) => {
    try{
        const { title, content, excerpt, coverImage, category, tags, status} = req.body;

        if (!title || !content) {
            return res
            .status(400)
            .json({ success: false, message: "Title and content are required." });
        }

        const slug = await generateUniqueSlug(title);

        const blog = await Blog.create({
            title,
            slug,
            content,
            excerpt,
            coverImage,
            category,
            tags,
            status,
            author: req.user._id
        })
        res
        .status(201)
        .json({ success: true, message: "Blog created successfully.", blog });
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "An error occurred while creating the blog.", error: error.message });
}
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ status: "published" })
        .populate("author", "firstName lastName username") // Populate author details (firstName, lastName, username)
        .sort({ createdAt: -1 }); // Sort by newest first

        res
        .status(200)
        .json({ success: true, count: blogs.length, blogs });
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "An error occurred while fetching blogs.", error: error.message });
    }
}

const getSingleBlog = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug, status: "published"})
        .populate("author", "firstName lastName username")

        if(!blog) {
            return res
            .status(404)
            .json({ success: false, message: "Blog not found." });
        }

        // Increment view count
        blog.views += 1;
        await blog.save();
        res
        .status(200)
        .json({ success: true, blog });
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "An error occurred while fetching the blog.", error: error.message });
    }
}

const updateBlog = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);

        if(!blog) {
            return res
            .status(404)
            .json({ success: false, message: "Blog not found." });
        }

        if(blog.author.toString() !== req.user._id.toString()) {
            return res
            .status(403)
            .json({ success: false, message: "You are not authorized to update this blog." });
        }

        if (req.body.title && req.body.title !== blog.title) {
  blog.slug = await generateUniqueSlug(req.body.title, blog._id);
  blog.title = req.body.title;
}


      if (req.body.content) blog.content = req.body.content;
    if (req.body.excerpt) blog.excerpt = req.body.excerpt;
    if (req.body.tags) blog.tags = req.body.tags;
    if (req.body.category) blog.category = req.body.category;
    if (req.body.status) blog.status = req.body.status;
    if (req.body.coverImage) blog.coverImage = req.body.coverImage;


        // Object.assign(blog, req.body) // Update blog with new data from request body
        await blog.save();
        res
        .status(200)
        .json({ success: true, message: "Blog updated successfully.", blog });
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "An error occurred while updating the blog.", error: error.message });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)

        if(!blog) {
            return res            
            .status(404)
            .json({ success: false, message: "Blog not found." });
        }

        if(blog.author.toString() !== req.user._id.toString() && req.user.role !== "admin"){
            return res
            .status(403)
            .json({ success: false, message: "You are not authorized to delete this blog." });
        }

        await blog.deleteOne();
        res
        .status(200)
        .json({ success: true, message: "Blog deleted successfully." });

    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "An error occurred while deleting the blog.", error: error.message });
    }
}

const likeBlog = async (req, res) => {
try {
    const blog = await Blog.findById(req.params.id)

    if(!blog){
        return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }

    const userId = req.user._id //logged in user id

    const isLiked = blog.likes.includes(userId)

    if(isLiked) {
        // If already liked, remove the like (unlike)
        blog.likes.pull(userId);
    } else {
        // If not liked, add the like
        blog.likes.push(userId);
    }
    await blog.save();
    return res
        .status(200)
        .json({ success: true, message: isLiked ? "unliked" : "liked", totalLikes: blog.likes.length });
} catch (error) {
    res
    .status(500)
    .json({ success: false, message: "An error occurred while liking the blog.", error: error.message });
}
};

export { createBlog, 
         getAllBlogs,
         getSingleBlog, 
         updateBlog, 
         deleteBlog,
         likeBlog 
        };