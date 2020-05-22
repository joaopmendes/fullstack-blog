const Post = require("../Models/Post");
const validateStoreInputs = (subject, body) => {
  let errors = [];
  if (!subject) {
    errors.push("The subject is required");
  } else {
    if (subject.length < 3 || subject > 50) {
      errors.push("The subject must be between 3 and 50 characters");
    }
  }
  if (!body) {
    errors.push("The body is required");
  } else {
    if (body.length < 10 || body > 500) {
      errors.push("The body must be between 10 and 500 characters");
    }
  }

  return errors;
};

async function checkIfPostIsFromUser(postId, user) {
  if (!postId || !user) throw new Error("Provide the params or this will not work");
  const post = await Post.findById(postId);
  if (!post) {
    return false;
  }
  return await post.validAuthor(user);
}

module.exports = {
  async index(req, res) {
    return res.status(200).json({
      data: await Post.find({}, "-__v").populate("author", "name email -_id").populate("tags", "-_id -__v").exec(),
    });
  },
  async store(req, res) {
    let { subject, body, tags } = req.body;

    // Returns an array with errors
    const errors = validateStoreInputs(subject, body);
    if (errors.length > 0) {
      return res.status(405).json({ errors });
    }
    // Creates a post
    let post;
    try {
      post = new Post({ subject, body, created_at: new Date().toJSON() });
      post.author = req.user;
      if (req.file) {
        post.postImage = req.file.path;
      }
      let tagsArray = tags ? tags.split(",") : [];
      if (tagsArray && tagsArray.length > 0) {
        for (const tag of tagsArray) {
          try {
            await post.addTag(tag);
          } catch (e) {
            return res.status(500).json({ error: "Something went wrong trying to create post", e });
          }
        }
      } else {
        await post.save();
      }
    } catch (e) {
      return res.status(500).json({ error: "Something went wrong trying to create post", e });
    }
    if (!post) {
      return res.status(500).json({ error: "Post was not created." });
    }

    // Add post to user
    if (!(await req.user.addPost(post))) {
      await Post.findByIdAndDelete(post._id);
      return res.status(500).json({ errorMessage: "Could not save post to user" });
    }
    let createdPost = await Post.findOne({ _id: post._id }, "-__v")
      .populate("author", "name -_id,__v")
      .populate("tags", "name -_id,__v")
      .exec();
    return res.status(200).json({ data: createdPost });
  },
  async destroy(req, res) {
    const { id } = req.params;

    if (!(await checkIfPostIsFromUser(id, req.user))) {
      return res.status(200).json({ code: 403, errrorMessage: "Post cannot be deleted with your permissions" });
    } else {
      return Post.findByIdAndDelete(id)
        .then(async () => {
          // Remove from user array too
          await req.user.removePost(id);
          return res.status(200).json({ code: 200, message: "Post deleted" });
        })
        .catch((err) => {
          return res.status(200).json({ code: 500, errrorMessage: "Post cannot be deleted" });
        });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { subject, body, tags } = req.body;
    // Returns an array with errors
    const errors = validateStoreInputs(subject, body);
    if (errors.length > 0) {
      return res.status(405).json({ errors });
    }
    if (!(await checkIfPostIsFromUser(id, req.user))) {
      return res.status(403).json({ code: 403, errorMessage: "Post cannot be updated with your permissions" });
    } else {
      return Post.findById(id)
        .then(async (doc) => {
          if (!doc) {
            return res.status(400).json({ code: 500, error: "Could not find post with that id" });
          }
          doc.subject = subject;
          doc.body = body;
          if (req.file) {
            doc.postImage = req.file.path;
          }
          await doc.clearTags();
          let tagsArray = tags ? tags.split(",") : [];
          if (tagsArray && tagsArray.length > 0) {
            for (const tag of tagsArray) {
              try {
                await doc.addTag(tag);
              } catch (e) {
                return res.status(500).json({ errorMessage: "Something went wrong trying to update post tags", e });
              }
            }
          } else {
            try {
              await doc.save();
            } catch (e) {
              return res.status(500).json({ errorMessage: "Something went wrong trying to update post", e });
            }
          }
          return res.status(200).json({ code: 200, data: doc });
        })
        .catch((err) => {
          return res.status(500).json({ code: 500, errorMessage: "Post cannot be updated" });
        });
    }
  },
};
