const bcrypt = require("bcryptjs");
const db = require("../db"); 
const jwt = require("jsonwebtoken");
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

        const maxUserId = result[0].maxUserId || 0;

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
                    const token = jwt.sign({ userId: maxUserId+1, isAdmin: 0 }, process.env.JWT_SECRET);
                    return res.json({message: "Valid", token})
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
                const token = jwt.sign({ userId: results[0].user_id, isAdmin: results[0].user_is_admin }, process.env.JWT_SECRET);
                return res.json({message: "Valid", token})
            } else {
                return res.json({message: "Wrong username or password"}) 
            }
        }
    })
}

module.exports = {
    registerUser,
    loginUser
};