const recruitModel = require('../models/recruitModel.js');
const fs = require('fs');
const nodemailer = require("nodemailer");
const inlineBase64 = require('nodemailer-plugin-inline-base64');

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
        const emailAddress = mail_info.emailAddress;
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
            
            // inline base64 image
            transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

            // 상단 글자 삭제 실패..
            let mailOptions = {
                from: process.env.PIRO_MAIL,
                to: emailAddress,
                subject: `[피로그래밍 ${process.env.PIRO_LEVEL}기] 지원서 사본`,
                html: `<html><body><img src="${mail_info.page1}" width="80%" height="80%" style="margin-top: -100px;" /><br /><img src="${mail_info.page2}" width="80%" height="80%" style="margin-top: -100px;" /><br /><img src="${mail_info.page3}" width="80%" height="80%" style="margin-top: -100px;" /><br /><img src="${mail_info.page4}" width="80%" height="80%" style="margin-top: -100px;" /></body></html>`,
            };
            const info = await transporter.sendMail(mailOptions);
            console.log(info.messageId);
            res.send({ 'status': true });
        } catch {
            res.send({ 'status': false });
        }
    }
}