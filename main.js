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

const passport = require('./config/passport.js');
const session = require('express-session');
app.use(passport.initialize());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.authenticate('session'));

const recruitRouter = require('./routers/recruitRouter.js');
const authRouter = require('./routers/authRouter.js');
const examineRouter = require('./routers/examineRouter.js');
app.use('/api/recruit', recruitRouter);
app.use('/api/auth', authRouter);
app.use('/api/examine', examineRouter);

app.listen(port, () => {
    console.log(`I am listening on port ${port}`);
});
