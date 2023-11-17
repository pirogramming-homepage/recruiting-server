const nodemailer = require("nodemailer");
const inlineCss = require('nodemailer-juice');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
// node mailer
const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground' // Redirect URL(Optional)
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.google.com",
    port: 587,
    secure: true,
    logger: true,
    pool: true,
    maxConnections: 1,
    auth: {
        type: "OAuth2",
        user: process.env.OAUTH_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});
transporter.use('compile', inlineCss());

let mailOptions = {
    from: '',
    to: '',
    subject: '',
    html: ''
};

transporter.on('idle', async () => {
    // send next messages from the pending queue
    while(transporter.isIdle() && mailOptions.html.length){
        await transporter.sendMail(mailOptions);
        mailOptions.html = '';
    }
});

module.exports = transporter;