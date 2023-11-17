const express = require('express'); 
const cors = require('cors')

require("dotenv").config();
const app = express()
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


/* Backend main page */
app.get("/", (req, res) => { 
  return res.json("Backend server: Quiz App");
})

/* Routes */
const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);

const quizRouter = require('./routes/quizRouter');
app.use('/quiz', quizRouter);

/* Application port*/ 
app.listen(process.env.PORT, () =>{      
    console.log("Backend is on port " + process.env.PORT);
})