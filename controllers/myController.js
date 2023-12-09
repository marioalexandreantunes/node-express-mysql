const connection = require("../helpers/connection.js");
const string = require("string-sanitizer");

const get_index = async (req, res) => {

    if (req.session.loggedin) {
        res.render("index", {
            user: req.session.user,
        });
    } else {
        res.redirect('/login')
    }
}

const get_login = async (req, res) => {
    res.render("login", { message: "" });
}

const get_logout = (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/");
};

const post_login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!string.validate.isEmail(email)) {
        res.render("pages/login", { message: "Incorrect Email and/or Password!" });
    }

    password = string.removeSpace(password);

    if (email && password) {
        // Query Auth
        try {

        }
        catch (e) {
            console.log(e);
        }
    } else {
        res.render("pages/login", { message: "Please enter Email and Password!" });
    }
}

module.exports = { get_index, get_login, post_login, get_logout };
