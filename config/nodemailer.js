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
    port: 465,
    secure: true,
    logger: true,
    pool: true,
    maxConnections: 5,
    maxMessages: 5,
    auth: {
        type: "OAuth2",
        user: process.env.OAUTH_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken
    },
});
transporter.use('compile', inlineCss());

module.exports = transporter;