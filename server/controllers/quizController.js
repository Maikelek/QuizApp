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

const getOptions = (req, res) => {
    const id = req.body.id;   
    const q = ` SELECT o.*, q.question_text, qz.quiz_title, qz.quiz_id
                FROM options o
                JOIN questions q ON o.question_id = q.question_id
                JOIN quizes qz ON q.quiz_id = qz.quiz_id
                WHERE o.question_id = ?`;

    db.query(q,[id],(error, data) => {   
        if(error) return res.json("error");
        return res.send(data)
    })
};


const quizData = (req, res) => {
  const id = req.body.id;

  const q = `
    SELECT
      q.quiz_title,
      qs.question_id,
      qs.question_text,
      o.option_id,
      o.option_a,
      o.option_b,
      o.option_c,
      o.option_correct
    FROM quizes q
    JOIN questions qs ON q.quiz_id = qs.quiz_id
    JOIN options o ON qs.question_id = o.question_id
    WHERE q.quiz_id = ?;
  `;

  db.query(q, [id], (error, data) => {
    if (error) {
      console.error(error);
      return res.json("error");
    }

    const quizTitle = data.length > 0 ? data[0].quiz_title : null;

    const quizQuestions = data.map(item => ({
      question_id: item.question_id,
      question_text: item.question_text,
      options: {
        option_id: item.option_id,
        option_a: item.option_a,
        option_b: item.option_b,
        option_c: item.option_c,
        option_correct: item.option_correct
      }
    }));

    const result = {
      quizTitle: quizTitle,
      questions: quizQuestions
    };

    return res.send(result);
  });
};

const removeQuiz = (req, res) => {
  const quiz_id = req.body.id;
  const query_options = `DELETE options FROM options
                          JOIN questions ON options.question_id = questions.question_id
                          WHERE questions.quiz_id = ?`;
  const query_questions = "DELETE FROM questions WHERE quiz_id = ?";
  const query_quizes = "DELETE FROM quizes WHERE quiz_id = ?";

  db.query(query_options, [quiz_id], (err, data) => {
    if (err) return res.send(err);

    db.query(query_questions, [quiz_id], (err, data) => {
      if (err) return res.send(err);
    });

    db.query(query_quizes, [quiz_id], (err, data) => {
      if (err) return res.send(err);
      return res.json("Deleted");
    });

  });
};

const removeQuestion = (req, res) => {
  const question_id = req.body.question_id;
  const query_question = "DELETE FROM options WHERE question_id = ?";
  const query_option = "DELETE FROM questions WHERE question_id = ?";

  db.query(query_question, [question_id], (err, data) => {
    if (err) return res.send(err);

    db.query(query_option, [question_id], (err, data) => {
      if (err) return res.send(err);
      return res.json("Deleted");
    });
  });
  
};


module.exports = {
    getQuizes,
    getQuestions,
    getOptions,
    quizData,
    removeQuiz,
    removeQuestion
};