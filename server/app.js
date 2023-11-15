const express = require('express'); 

require("dotenv").config();
const app = express()


/* Backend main page */
app.get("/", (req, res) => { 
  return res.json("Backend server: Quiz App");

})


/* Application port*/ 
app.listen(process.env.PORT, () =>{      
    console.log("Backend is on port " + process.env.PORT);
})