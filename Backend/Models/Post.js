const db = require("mongoose");
const User = require("./User");
const { searchTagByName, createTagByName } = require("../Helpers/Tag");
const postScheema = new db.Schema({
    subject: {type: String, required: true},
    body: {type: String, required: true},
    postImage: {type: String, default: ""},
    author: { type: db.Schema.Types.ObjectId, ref: 'user' },
    tags: [{ type: db.Schema.Types.ObjectId, ref: 'tag' }]
});

/**
 * This function returns the tag by default, or if it is a string checks if it exists or creates one
* @param tag {Tag object, TagID, tagName} A tag object or a tag name to be created or restored
* @returns {Promise<Object>}
*/
const validateInput = async (tag) => {
    if(!tag) throw Error("You must specify the tag  of the tag.");

    if(typeof tag === "string") {
        // Search for that tag name
        let tagByName = await searchTagByName(tag);
        //if that tag doesnt exist, creates it
        if (!tagByName) {
            tagByName = await createTagByName(tag);
        }
        return tagByName;
    }
    return tag
};
/**
 * Add a tag to the post
 * @param tag {Tag object, TagID, tagName} A tag object or a tag name to be created or restored
 * @returns {Promise<Object>}
 */
postScheema.methods.addTag = async function (tagInput){

    const newTag = await validateInput(tagInput);
    let isDuplicate = false;
    this.tags.forEach(tag => {
        let id;
        if(typeof tag === "string") {
            id = tag;
        } else {
            id = tag._id
        }
        if(id === newTag._id) {
            isDuplicate = true;
        }
    });
    if (isDuplicate) {
        return false;
    }
    this.tags.push(newTag);
    await this.save();
    return true;
};
/**
 * remove a tag of the post
 * @param tag {Tag object, TagID, tagName} A tag object or a tag name to be created or restored
 * @returns {Promise<Object>}
 */
postScheema.methods.removeTag = async function(tag)  {
    if(!tag) throw Error("You must specify the tag.");
    let tagToDelete = validateInput(tag);

    this.tags = this.tags.filter(
        tag => tag !== tagToDelete._id
    );
    this.save()
};
postScheema.methods.clearTags = async function() {
    this.tags = [];
    await this.save();
}
postScheema.methods.validAuthor = async function(user) {

    let author = this.author;
    let authorModel = author;
    if(typeof user === "string") {
        user = await User.findById(user);
        if(!user) {
            return false;
        }
    }

    console.log("user._id.toString()", user._id.toString());
    console.log("authorModel_id.toString()", authorModel._id.toString());
    console.log("Comparison: ", user._id.toString() === authorModel._id.toString());
    return user._id.toString() === authorModel._id.toString();

}
module.exports = db.model("post", postScheema);