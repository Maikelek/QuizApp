const express = require('express');
const router = express.Router(); 
const quizController = require('../controllers/quizController');
const {isAdmin, isAuthenticated} = require('../middleware/authentificator');


router.route("/")  
    .get(quizController.getQuizes)
    .post(quizController.quizData)

router.route("/user")  
    .post(isAuthenticated, quizController.saveUserStatistics)

router.route("/user/statistics")  
    .post(quizController.getStatistics) 

router.route("/admin")
    .post(isAdmin, quizController.getQuestions)
    .delete(isAdmin, quizController.removeQuiz)

router.route("/admin/quiz")
    .post(isAdmin, quizController.addQuiz)

router.route("/admin/addQuestion")
    .post(isAdmin, quizController.addQuestion)

router.route("/admin/optionEdit")
    .post(isAdmin, quizController.addOption)
    .put(isAdmin, quizController.updateOption)

router.route("/admin/question")  
    .post(isAdmin, quizController.getOptions)
    .put(isAdmin, quizController.updateQuestion)
    .delete(isAdmin, quizController.removeQuestion)



module.exports = router;