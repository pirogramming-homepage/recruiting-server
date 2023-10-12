const express = require('express');
const app = express();
const port = 3333;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors({
    origin: [
	'http://3.35.229.43:3000',
	'http://ec2-3-35-229-43.ap-northeast-2.compute.amazonaws.com:3000',
	'http://hello.pirogramming-recruit.p-e.kr',
	'http://localhost:3000',
	'http://localhost:3001'
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
