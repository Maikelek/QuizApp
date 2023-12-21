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

const addQuiz = (req, res) => {
  const quiz_title = req.body.quiz_title;
  const query = "INSERT INTO quizes (quiz_title) VALUES (?)";

  db.query(query, [quiz_title], (err, data) => {
    if (err) return res.send(err);
    return res.json("Added");
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

const addQuestion = (req, res) => {
  const question_title = req.body.question_title;
  const quiz_id = req.body.quiz_id;
  const query = "INSERT INTO questions (quiz_id, question_title) VALUES (?, ?)";

  db.query(query, [quiz_id, question_title], (err, data) => {
    if (err) return res.send(err);
    return res.json("Added");
  });
};

const addOption = (req, res) => {
  const { question, optionA, optionB, optionC, correctAnswer, id } = req.body.formData;
  const queryOption = "INSERT INTO options (option_id, question_id, option_a, option_b, option_c, option_correct) VALUES (0, ?, ?, ?, ?, ?)";
  const queryQuestion = "UPDATE questions SET question_text = ? WHERE question_id = ?";

  db.query(queryOption, [id, optionA, optionB, optionC, correctAnswer], (err, data) => {
    if (err) {
      console.error("Error adding option:", err);
      return res.json({ error: "Internal Server Error" });
    }

    db.query(queryQuestion, [question, id], (err, data) => {
      if (err) {
        console.error("Error updating question:", err);
        return res.json({ error: "Internal Server Error" });
      }

      return res.json("Added");
    });
  });
};

const updateOption = (req, res) => {
  const { question, optionA, optionB, optionC, correctAnswer, id } = req.body.formData;
  const queryOption = "UPDATE options SET option_a = ?, option_b = ?, option_c = ?, option_correct = ? WHERE question_id = ?";
  const queryQuestion = "UPDATE questions SET question_text = ? WHERE question_id = ?";

  db.query(queryOption, [optionA, optionB, optionC, correctAnswer, id], (err, data) => {
    if (err) {
      console.error("Error updating option:", err);
      return res.json({ error: "Internal Server Error" });
    }

    db.query(queryQuestion, [question, id], (err, data) => {
      if (err) {
        console.error("Error updating question:", err);
        return res.json({ error: "Internal Server Error" });
      }

      return res.json("Updated");
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


const updateQuestion = (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    correctAnswer,
    id
  } = req.body.formData;

  const query_update_question = "UPDATE questions SET question_text = ? WHERE question_id = ?";
  const query_update_options = "UPDATE options SET option_a = ?, option_b = ?, option_c = ?, option_correct = ? WHERE question_id = ?";

  db.query(query_update_question, [question, id], (err, data) => {
    if (err) {
      console.log(err);
      return res.send("Internal Server Error");
    }

    db.query(query_update_options, [optionA, optionB, optionC, correctAnswer, id], (err, data) => {
      if (err) {
        console.log(err);
        return res.send("Internal Server Error");
      }

      return res.json("Question and options updated successfully");
    });
  });
};

const saveUserStatistics = (req, res) => {
  const { id, userId, correct, question_num } = req.body;

  const query = "INSERT INTO stats (user_id, quiz_id, stat_correct_answers, stat_num_answers) VALUES (?, ?, ?, ?)";

  db.query(query, [userId, id, correct, question_num ], (err, data) => {
    if (err) {
      console.log(err);
      return res.send("Internal Server Error");
    }

    return res.json("User statistics saved successfully");
  });
};

const getStatistics = (req, res) => {
  const userId = req.body.userId;

  const query = `
    SELECT 
      s.*,
      u.user_name,
      qz.quiz_title
    FROM 
      stats s
    JOIN 
      users u ON s.user_id = u.user_id
    JOIN 
      quizes qz ON s.quiz_id = qz.quiz_id
    WHERE 
      s.user_id = ?
  `;

  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error(err);
      return res.send("Internal Server Error");
    }
    return res.send(data);
  });
};


module.exports = {
  getQuizes,
  getQuestions,
  getOptions,
  quizData,
  addQuiz,
  removeQuiz,
  addQuestion,
  addOption,
  updateOption,
  removeQuestion,
  updateQuestion,
  saveUserStatistics,
  getStatistics
};
