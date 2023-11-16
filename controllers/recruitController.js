const recruitModel = require('../models/recruitModel.js');
const fs = require('fs');
const nodemailer = require("nodemailer");
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const nodemailerHtml = require('../config/recruitForm.js');
const dateCheck = require('../utils/dateCheck.js');
const inlineCss = require('nodemailer-juice');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// 파이썬 파일 업로드
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname.split('.')[0]}.py`);
    },
    limits: { fileSize: 1024 * 1024 }
});
const upload = multer({ storage: storage }).array('coding-test');

module.exports = {
    saveForm: async (req, res) => {
        if (dateCheck.dateCheck()) {
            const formData = req.body;
            const result = await recruitModel.createRecruitForm(formData);
            return res.send(result);
        }
    },
    saveFile: async (req, res) => {
        if (dateCheck.dateCheck()) {
            upload(req, res, err => {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    console.log('[multer error]', err);
                    return res.send({ 'status': false });
                }
                // 파일명에 지원자 이름 명시
                try {
                    // console.log(req.files[0]);
                    fs.renameSync(req.files[0].path, `uploads/[${req.body.name}]_${req.files[0].filename}`);
                    console.log('[파일 저장 성공]', `uploads/[${req.body.name}]_${req.files[0].filename}`);
                    return res.send({ 'status': true });
                } catch {
                    return res.send({ 'status': false });
                }
            });
        }
    },
    sendMail: async (req, res) => {
        if (dateCheck.dateCheck()) {
            const oauth2Client = new OAuth2(
                process.env.OAUTH_CLIENT_ID,
                process.env.OAUTH_CLIENT_SECRET,
                'https://developers.google.com/oauthplayground' // Redirect URL(Optional)
            );

            oauth2Client.setCredentials({
                refresh_token: process.env.OAUTH_REFRESH_TOKEN
            });

            const accessToken = oauth2Client.getAccessToken();

            const mail_info = req.body;
            const emailAddress = mail_info.email;
            try {
                // node mailer
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: "smtp.google.com",
                    port: 587,
                    secure: true,
                    debug: true,
                    logger: true,
                    pool: true,
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

                const copy = await nodemailerHtml.getHtmlForm(mail_info);
                // console.log(copy);

                let mailOptions = {
                    from: process.env.PIRO_MAIL,
                    to: emailAddress,
                    subject: `[피로그래밍 ${process.env.PIRO_LEVEL}기] 지원서 사본`,
                    html: copy
                };

                transporter.on('idle', async () => {
                    // send next messages from the pending queue
                    while(transporter.isIdle()){
                        await transporter.sendMail(mailOptions);
                    }
                });

                // const info = await transporter.sendMail(mailOptions);
                // console.log(info.messageId);
                return res.json({ 'status': true });
            } catch (error) {
                console.log('recruit controller error!!!!', error);
                return res.json({ 'status': false });
            }
        }
    }
}