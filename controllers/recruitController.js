const recruitModel = require('../models/recruitModel.js');
const fs = require('fs');
const nodemailer = require("nodemailer");
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const nodemailerHtml = require('../config/recruitForm.js');
const inlineCss = require('nodemailer-juice');

module.exports = {
    saveForm: async (req, res) => {
        const formData = req.body;
        const result = await recruitModel.createRecruitForm(formData);
        res.send(result);
    },
    saveFile: async (req, res) => {
        // 파일명에 지원자 이름 명시
        try {
            fs.renameSync(req.files[0].path, `uploads/[${req.body.name}]_${req.files[0].filename}`);
            res.send({ 'status': true });
        } catch {
            res.send({ 'status': false });
        }
    },
    sendMail: async (req, res) => {
        const mail_info = req.body;
        const emailAddress = mail_info.email;
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.PIRO_MAIL,
                    pass: process.env.NODE_MAILER,
                },
            });

            transporter.use('compile', inlineCss());
            
            const copy = await nodemailerHtml.getHtmlForm(mail_info);
            console.log(copy);
            
            let mailOptions = {
                from: process.env.PIRO_MAIL,
                to: emailAddress,
                subject: `[피로그래밍 ${process.env.PIRO_LEVEL}기] 지원서 사본`,
                html: copy
            };
            const info = await transporter.sendMail(mailOptions);
            console.log(info.messageId);
            res.json({ 'status': true });
        } catch(error) {
            console.log('recruit controller error!!!!', error);
            res.json({ 'status': false });
        }
    }
}