const bcrypt = require("bcryptjs");
const db = require("../db");
require("dotenv").config();


const registerUser = (req, res) => {
    const name = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;
    const password_repeat = req.body.password_repeat;

    db.query('SELECT MAX(user_id) AS maxUserId FROM users', (error, result) => {
        if (error) {
            return console.log(error);
        }

        if (!name || !email || !password || !password_repeat) {
            return res.json({ message: "Please fill all fields!" });
        }

        if (password !== password_repeat) {
            return res.json({ message: "Passwords do not match!" });
        }

        db.query('SELECT user_email FROM users WHERE user_email = ?', [email], async (error, results) => {
            if (error) {
                return console.log(error);
            }
            if (results.length > 0) {
                return res.json({ message: "Email is already used!" });
            }

            let hashed_password = await bcrypt.hash(password_repeat, 8);

            db.query('INSERT INTO users (`user_name`, `user_email`, `user_password`, `user_is_admin`) VALUES (?, ?, ?, 0)', [name, email, hashed_password], (error, results) => {
                if (error) {
                    console.log(error);
                } else {            
                    return res.json({ message: "ok"});
                }
            });
        });
    });
};


const loginUser = (req, res) => {
    const nickname = req.body.nickname;
    const password = req.body.password;
    const query = "SELECT * FROM users WHERE user_name = ?";

    db.query(query, [nickname], async (error, results) => {
        if (results.length === 0) {
            return res.json({message: "Wrong username or password"})
        } else {

            if (await bcrypt.compare(password, results[0].user_password)) {
                user = {id: results[0].user_id, name:results[0].user_name, email: results[0].user_email, isAdmin: results[0].user_is_admin}
                req.session.user = user;
                return res.json({ message: "ok", user: user });
            } else {
                return res.json({message: "Wrong username or password"}) 
            }
        }
    })
}

const sessionExists = (req, res) => {
    if ( req.session.user) {
        res.send({ auth: true, user: req.session.user});
    } else {
        res.send({ auth: false, user:{user_is_admin: null}});
    }
};

const deleteSession = (req, res) => {
    if ( req.session.user ) {
        req.session.destroy(err => {
            if (err) {
                res.send({logout: false, message: "Problem with logging out"})
            } else {
                res.send({logout: true}) 
            }
        })
    } else {
          res.send({logout: false, message: "Session does not exist"})
        }
}

module.exports = {
    registerUser,
    loginUser,
    sessionExists,
    deleteSession
};