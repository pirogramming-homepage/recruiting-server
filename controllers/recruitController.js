const recruitModel = require('../models/recruitModel.js');
const fs = require('fs');
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const dateCheck = require('../utils/dateCheck.js');
const nodemailerHtml = require('../config/recruitForm.js');
const transporter = require('../config/nodemailer.js');

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
            try {
                const result = await recruitModel.createRecruitForm(formData);
                console.log('form saved!!!', result);
                return res.send(result);
            } catch(error) {
                console.log('save form error!!!!', error);
                return res.send({status: "fail"});
            }
        }
    },
    saveFile: async (req, res) => {
        if (dateCheck.dateCheck()) {
            upload(req, res, err => {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    console.log('[multer error]', err);
                    return res.send({ status: false });
                }
                // 파일명에 지원자 이름 명시
                try {
                    // console.log(req.files[0]);
                    fs.renameSync(req.files[0].path, `uploads/[${req.body.name}]_${req.files[0].filename}`);
                    console.log('[파일 저장 성공]', `uploads/[${req.body.name}]_${req.files[0].filename}`);
                    return res.send({ status: true });
                } catch {
                    return res.send({ status: false });
                }
            });
        }
    },
    sendMail: async (req, res) => {
        if (dateCheck.dateCheck()) {
            const mail_info = req.body;
            const emailAddress = mail_info.email;
            try {

                const copy = await nodemailerHtml.getHtmlForm(mail_info);
                // console.log(copy);

                mailOptions = {
                    from: process.env.PIRO_MAIL,
                    to: emailAddress,
                    subject: `[피로그래밍 ${process.env.PIRO_LEVEL}기] 지원서 사본`,
                    html: copy
                };

                const info = await transporter.sendMail(mailOptions);
                // console.log(info.messageId);
                return res.json({ status: true });
            } catch (error) {
                console.log('recruit controller error!!!!', error);
                return res.json({ status: false });
            }
        }
    }
}