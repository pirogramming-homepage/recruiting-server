const express = require('express');
const app = express();
const port = 3333;

const bodyParser = require('body-parser');
const cors = require('cors');

const RecruitRouter = require('./routers/recruitRouter.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/recruit', RecruitRouter);

app.listen(port, () => {
    console.log(`I am listening on port ${port}`);
});