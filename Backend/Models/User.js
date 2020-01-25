const db = require("mongoose");
const Post = require("./Post");
const userSchema = new db.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    accessToken: {type: String, default: ""},
    posts: [
        {type: db.Schema.Types.ObjectId, ref: "post"}
    ]
});
/**
 * This function returns the post by default, or if it is a string checks
 * @param post {Tag object, TagID, tagName} A post object or a post id
 * @returns {Promise<Object>}
 */
const validateInput = async (post) => {
    if (!post) throw Error("You must specify the id  of the post or the post itself.");

    if (typeof post === "string") {
        try {
            return await Post.findById(post);
        } catch (e) {
            throw Error("Post not found");
        }
    }
    return post
};
userSchema.methods.addPost = async function(post) {
    let newPost;
    try {
        newPost = await validateInput(post)
    } catch (e) {
        return false;
    }
    let isDuplicate = false;

    this.posts.forEach(post => {
        let id;
        if (typeof post === "string") {
            id = post;
        } else {
            id = post._id
        }
        if (id === newPost._id) {
            isDuplicate = true;
        }
    });
    if (isDuplicate) {
        return false;
    }
    this.posts.push(newPost);
    await this.save();
    return true;
};

userSchema.methods.removePost = async function(post) {
    if (!post) throw Error("You must specify the tag.");
    let postToDelete = validateInput(post);

    this.posts = this.posts.filter(
        post => {
            return post._id !== postToDelete._id
        }
    );
    await this.save();
};
module.exports = db.model("user", userSchema);