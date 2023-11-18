const express = require('express');
const router = express.Router(); 
const quizController = require('../controllers/quizController');



router.route("/")  
    .get(quizController.getQuizes)
    .post(quizController.quizData)


router.route("/admin")  
    .post(quizController.getQuestions);


router.route("/admin/question")  
    .post(quizController.getOptions);



module.exports = router;