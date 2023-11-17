const express = require('express');
const router = express.Router(); 
const quizController = require('../controllers/quizController');



router.route("/")  
    .get(quizController.getQuizes);


router.route("/admin")  
    .post(quizController.getQuestions);



module.exports = router;