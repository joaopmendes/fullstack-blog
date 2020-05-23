const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../Helpers/Auth");

module.exports = {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ code: 400, errorMessage: "Bad format." });
    }
    User.findOne({ email })
      .then(user => {
        if (user && user.email) {
          return res.status(400).json({ code: 400, errorMessage: "Email already in use" });
        }
        bcrypt
          .hash(password, 10)
          .then(async hashedPassword => {
            const user = new User({ name, email, password: hashedPassword });
            user.accessToken = createAccessToken(email);
            if (req.file) {
              user.profilePicture = req.file.path.replace(/\\/g, "/");
            }
            await user.save();

            return res.status(200).json({
              code: 200,
              user: await User.findOne({ email: user.email }, "name email admin accessToken posts profilePicture")
                .populate("posts")
                .exec()
            });
          })
          .catch(err => {
            return res.status(400).json({ code: 400, errorMessage: "Error trying to encrypt password." });
          });
      })
      .catch(err => {
        return res.status(400).json({ code: 400, errorMessage: "A error ocurred. We're sorry.", err });
      });
  },
  login: async function(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ code: 400, errorMessage: "Bad format." });
    }

    User.findOne({ email })
      .then(async user => {
        if (!user || !user.email) {
          return res.status(405).json({ code: 405, errorMessage: "Could not find your email." });
        }
        let doesPasswordMatch = await bcrypt.compare(password, user.password);
        if (doesPasswordMatch) {
          user.accessToken = createAccessToken(email);
          user.save();
          return res.status(200).json({
            code: 200,
            user: await User.findOne({ email: user.email }, "name email admin accessToken posts profilePicture")
              .populate("posts")
              .exec()
          });
        } else {
          return res.status(405).json({ code: 405, errorMessage: "Wrong Password" });
        }
      })
      .catch(err => {
        return res.status(500).json({ code: 500, errorMessage: "A error ocurred. We're sorry." });
      });
  },
  async find(req, res) {
    return res.status(200).json({
      code: 200,
      data: await User.findOne({ email: req.user.email }, "name email admin accessToken posts profilePicture")
        .populate({
          path: "posts",
          select: "-__v",
          populate: { path: "tags", select: "-__v" }
        })
        .exec()
    });
  }
};
