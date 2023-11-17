const bcrypt = require("bcryptjs");
const db = require("../db"); 


const registerUser = (req, res) => {
   
    const name = req.body.nickname;
    const email = req.body.email;
    const password = req.body.password;
    const password_repeat = req.body.password_repeat;

    db.query('SELECT user_email FROM users WHERE user_email = ?', [email], async (error, results) =>{
        if(error) {
           return console.log(error);
        } 
        console.log(results)
        if ( results.length > 0 ) {
            return res.status(401).json({ message: "Email is already used !" });
        }

        let hashed_password = await bcrypt.hash(password_repeat, 8);

        db.query('INSERT INTO users (`user_id`,`user_name`, `user_email`, `user_password`, `user_is_admin`) VALUES (0,?,?,?,0)', [name, email, hashed_password], (error, results) =>{
            if(error) {
                console.log(error);
            } else {
                return res.status(200).json({ messageGreen: "You are registered." });
            }
        });
    });
}

module.exports = {
    registerUser
};