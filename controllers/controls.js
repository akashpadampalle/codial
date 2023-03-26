const User = require('../models/user');

// login form controller
module.exports.loginForm = function (req, res) {
  res.render("login", {
    title: "Codial | login",
  });
};

// signup form controller
module.exports.signupForm = function (req, res) {
  res.render("signup", {
    title: "Codial | signup",
  });
};

// create user
module.exports.create = function (req, res) {
  // TODO create user
};

// create session for login user
module.exports.createSession = function (req, res) {
  // TODO create user session
  try {
    // check if user existed or not
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // handle if user exit
      if (user.password == req.body.password) {
        // create a session if password matches
        res.cookie("user_id", user._id);
        res.render("user-home", { title: "Codial | home", user: user });
      } else {
        // if password does not match
        throw new Error("wrong password");
      }
    } else {
      // handle if user does not exist
      throw new Error("user does not found");
    }
  } catch (error) {
    console.log("Error: ", error.message);
    res.redirect("back");
  }
};
