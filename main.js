const express = require('express');
const app = express();
const port = 3333;

const bodyParser = require('body-parser');
const cors = require('cors');

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
	'http://hello.pirogramming-recruit.p-e.kr',
	'http://localhost:3000'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.set("view engine", "ejs");
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

app.get('/test', (req, res) => {
    res.render('recruitForm.ejs', {
        level: process.env.LEVEL,
        interview_date: process.env.INTERVIEW_DATE,
        full_schedule: process.env.FULL_SCHEDULE,
        workshop_date: process.env.WORKSHOP_DATE,
        email: 'hello'
    });
})

const RecruitRouter = require('./routers/recruitRouter.js');

app.use('/api/recruit', RecruitRouter);

app.listen(port, () => {
    console.log(`I am listening on port ${port}`);
});
