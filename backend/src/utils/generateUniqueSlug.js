import Blog from "../models/blog.model.js";
import slugify from "./slugify.js";

const generateUniqueSlug = async (title) => {
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (await Blog.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

export default generateUniqueSlug;