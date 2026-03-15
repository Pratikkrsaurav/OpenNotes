import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        indxed: true,
    },

    excerpt: {
        type: String,
        maxlength: 300,
        default: "",
    },


// | title | String |
// | slug | String (unique) |
// | content | String |
// | excerpt | String |
// | coverImage | String |
// | author | ObjectId (User) |
// | category | ObjectId (Category) |
// | tags | [ObjectId] |
// | likes | [ObjectId(User)] |
// | views | Number |
// | status | enum (draft, published) |
// | publishedAt | Date |
// | createdAt | Date |


    content: {
        type: String,
        required: true,
    },

    excerpt: {
        type: String,
        maxlength: 300,
        default: "",
    },

    coverImage: {
        type: String,
        default: "",
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },

    tags: [{
        type: String,
        trim: true,
        lowercase: true,
    }],

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    views: {
        type: Number,
        default: 0,
    },

    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    publishedAt: {
        type: Date,
    },

},
{ timestamps: true}
)

const Blog = mongoose.model("Blog", blogSchema)
export default Blog;