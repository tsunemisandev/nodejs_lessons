const express = require('express');
const questionController = require('./controllers/QuestionsController');
const PORT = 3000;

//instantiate app
const app = express();

//serve route
app.get('/questions/list/', questionController.doGetListQuestions);

//serve at port 3000
app.listen(PORT);

console.log(`app served at port ${PORT}`);
