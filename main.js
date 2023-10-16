const express = require('express');
const app = express();
const port = 3333;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors({
    origin: [
	'https://52.79.205.140',
	'https://ec2-52-79-205-140.ap-northeast-2.compute.amazonaws.com',
	'https://52.79.205.140:3000',
	'https://ec2-52-79-205-140.ap-northeast-2.compute.amazonaws.com:3000',
	'https://piro-recruiting.top',
	'https://localhost:3000',
	'https://127.0.0.1:3000',

	'http://52.79.205.140',
	'http://ec2-52-79-205-140.ap-northeast-2.compute.amazonaws.com',
	'http://52.79.205.140:3000',
	'http://ec2-52-79-205-140.ap-northeast-2.compute.amazonaws.com:3000',
	'http://piro-recruiting.top',
	'http://localhost:3000',
	'http://127.0.0.1:3000',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.set("view engine", "ejs");
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

const recruitRouter = require('./routers/recruitRouter.js');
const authRouter = require('./routers/authRouter.js');
// const examineRouter = require('./routers/examineRouter.js');
app.use('/api/recruit', recruitRouter);
app.use('/api/auth', authRouter);
// app.use('/api/examine', examineRouter);

app.listen(port, () => {
    console.log(`I am listening on port ${port}`);
});
