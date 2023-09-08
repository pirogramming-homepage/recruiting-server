const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;

const RecruitRouter = require('./routers/recruitRouter.js');

app.use('/', RecruitRouter);

app.listen(port, () => {
    console.log(`I am Listening on port ${port}`);
});