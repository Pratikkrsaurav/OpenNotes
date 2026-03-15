import Comment from "../models/comment.model";
import Blog from "../models/blog.model";

const addComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { content } = req.body; 
        
        if (!content) {
            return res
            .status(400)
            .json({ success:false, message: "Content is required" })
        }

        const blogExist = await Blog.findById(blogId);
        if(!blogExist) {
            return res
            .status(404)
            .json({ success:false, message: "Blog not found" })
        }

        const comment = await Comment.create({
            content,
            blog: blogId,
            author: req.user._id
        })

        res
        .status(201)
        .json({ success:true, message: "Comment added successfully", comment })


    } catch (error) {
        res
        .status(500)
        .json({ success:false, message: "Error while adding comment", error: error.message })
    }
}

const getCommentByBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

            const blog = await Blog.findById(blogId);
            if(!blogExist) {
                return res
                .status(404)
                .json({ success:false, message: "Blog not found" })
            }

            const comments = await Comment.find({ blog: blogId})
            .populate("author", "firstName lastName username")
            .sort({ createdAt: -1 });

            res
            .status(200)
            .json({ success:true, message: "Comments fetched successfully", comments })
    } catch (error) {
        res
        .status(500)
        .json({ success:false, message: "Error while fetching comments", error: error.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res
            .status(404)
            .json({ success:false, message: "Comment not found" })
        }

        if(comment.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res
            .status(403)
            .json({ success:false, message: "You are not authorized to delete this comment" })
        }

        await comment.deleteOne()

        res
        .status(200)
        .json({ success:true, message: "Comment deleted successfully" })
        
        
    } catch (error) {
        res
        .status(500)
        .json({ success:false, message: "Error while deleting comment", error: error.message })
    }

    export {
    addComment,
    getCommentByBlog,
    deleteComment
    }
}