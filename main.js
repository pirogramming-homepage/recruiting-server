const express = require('express');
const app = express();
const port = 3333;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
	origin: [
		'https://piro-recruiting.top',
		'https://localhost:3000',
		'https://127.0.0.1:3000',

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
// const authRouter = require('./routers/authRouter.js');
// const examineRouter = require('./routers/examineRouter.js');
app.use('/api/recruit', recruitRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/examine', examineRouter);

app.listen(port, () => {
	console.log(`I am listening on port ${port}`);
});
