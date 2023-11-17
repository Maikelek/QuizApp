const db = require("../db"); 


const getQuizes = (req, res) => {   
    const q = "SELECT * from quizes";
  
    db.query(q,(error, data) => {   
        if(error) return res.json("error");
        return res.send(data);
    })
};


const getQuestions = (req, res) => {
    const id = req.body.id;
    const questionsQuery = `SELECT * FROM questions WHERE quiz_id = ?`;
    const quizTitleQuery = `SELECT quiz_title FROM quizes WHERE quiz_id = ?`;

    db.query(questionsQuery, [id], (errorQuestions, questionsData) => {
        if (errorQuestions) {
            if(error) return res.json("error");
        }

        db.query(quizTitleQuery, [id], (errorQuizTitle, quizTitleData) => {
            if (errorQuizTitle) {
                if(error) return res.json("error");
            }

            return res.send({
                questions: questionsData,
                quizTitle: quizTitleData[0],
            });
        });
    });
};


module.exports = {
    getQuizes,
    getQuestions
};