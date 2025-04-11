const express = require('express');
const router = express.Router(); 
const authController = require('../controllers/authController');

router.route("/register")  
    .post(authController.registerUser);

router.route("/login")  
    .post(authController.loginUser);

router.route("/session")  
    .get(authController.sessionExists)
    .delete(authController.deleteSession);


module.exports = router;