const express = require('express');
const app = express();
const port = 3333;

const bodyParser = require('body-parser');
const cors = require('cors');

const RecruitRouter = require('./routers/recruitRouter.js');

app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));
app.use(cors({
    origin: [
	'http://43.201.16.162:3000',
	'http://ec2-43-201-16-162.ap-northeast-2.compute.amazonaws.com:3000',
	'http://localhost:3000'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use('/api/recruit', RecruitRouter);

app.listen(port, () => {
    console.log(`I am listening on port ${port}`);
});
