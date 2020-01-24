const Tag = require("../Models/Tag");

module.exports = {
    createTagByName: async function (name) {
        let tag;
        try {
            tag = new Tag({name});
            await tag.save();
            return tag;
        } catch (e) {
            console.log(e)
            throw new Error("Could not create tag");
        }

    },
    /**
     *
     * @param name
     * @returns {Promise<object | null>}
     */
    searchTagByName: function (name) {
        if (!name) throw new Error("A name must be provided to search the tag");
        return Tag.findOne({name})
            .then(doc => {
                if (doc) {
                    return doc;
                } else {
                    return null
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
    searchTagById: function (id) {
        if (!id) throw new Error("A id must be provided to search the tag");
        return Tag.findById(id)
            .then(doc => {
                if (doc) {
                    return doc;
                } else {
                    return null
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
    deleteTagById: function (id) {
        if (!id) throw new Error("A id must be provided to remove the tag");
        return Tag.findByIdAndDelete(id)
            .then(_ => true)
            .catch(err => {
                console.log(err)
                return false;
            })
    },
    updateTagById: function (id, newName) {
        if (!id) throw new Error("A id must be provided to update the tag");
        if (!newName) throw new Error("A newName must be provided to update the tag");
        return Tag.findByIdAndUpdate(id, {name: newName})
            .then(_ => {
                return searchTagById(id);
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }
};