const express = require('express');
const router = express.Router(); 
const quizController = require('../controllers/quizController');



router.route("/")  
    .get(quizController.getQuizes)
    .post(quizController.quizData)

router.route("/user")  
    .post(quizController.saveUserStatistics)

router.route("/user/statistics")  
    .post(quizController.getStatistics) 

router.route("/admin")
    .post(quizController.getQuestions)
    .delete(quizController.removeQuiz)

router.route("/admin/quiz")
    .post(quizController.addQuiz)

router.route("/admin/addQuestion")
    .post(quizController.addQuestion)

router.route("/admin/optionEdit")
    .post(quizController.addOption)
    .put(quizController.updateOption)

router.route("/admin/question")  
    .post(quizController.getOptions)
    .put(quizController.updateQuestion)
    .delete(quizController.removeQuestion)



module.exports = router;