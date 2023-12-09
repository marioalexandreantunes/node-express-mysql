const bcrypt = require("bcrypt");

const get_compare = (input_login, from_mysql) => {
    bcrypt.compare(input_login, from_mysql, function (err, result) {
        if (result) {
            console.log("Password verified");
            return true;
        }
        else {
            console.log("Password not verified");
            return false;
        }
    });
};

const get_hash = (password) => {
    bcrypt.hash(password, 8, function (err, hash) {
        console.log(`Hash: ${hash}`);
    });
    return hash;
};

module.exports = { get_hash, get_compare, };
