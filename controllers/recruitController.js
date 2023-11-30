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
        const originName = file.originalname; // hello.world.py
        let newFileName = '';
        let filename = '';
        let exp = '';
        let uploadFileList = '';
        if (originName.indexOf('.')) {
            const lastDotIdx = originName.lastIndexOf('.');
            filename = originName.substring(0, lastDotIdx); // hello.world
            exp = originName.substring(lastDotIdx); // .py
        } else {
            // 확장자가 없을 때
            filename = originName;
        }
        do {
            const randInt = Math.trunc(Math.random() * 100);
            newFileName = `${filename}_${randInt}${exp}`;
            uploadFileList = fs.readdirSync('./uploads');
        } while (uploadFileList.includes(newFileName));
        cb(null, newFileName);
    },
    limits: { fileSize: 1024 * 1024 }
});
const upload = multer({ storage: storage }).array('coding-test');

let mailOptions = [];

transporter.on('idle', () => {
    console.log('here!!!');
    // send next messages from the pending queue
    while (transporter.isIdle() && mailOptions.length) {
        console.log('here!!!~~~');
        transporter.sendMail(mailOptions.shift());
        console.log(mailOptions.length);
    }
});

module.exports = {
    checkTime: async (req, res) => {
        console.log('welcome!!');
        const check = await dateCheck.dateCheckDetail();
        return res.json({ check: check });
    },
    saveForm: async (req, res) => {
        const check = await dateCheck.dateCheck();
        if (check) {
            const formData = req.body;
            try {
                const result = await recruitModel.createRecruitForm(formData);
                console.log('form saved!!!', result);
                return res.send(result);
            } catch (error) {
                console.log('save form error!!!!', error);
                return res.send({ status: "fail" });
            }
        }
    },
    saveFile: async (req, res) => {
        const check = await dateCheck.dateCheck();
        if (check) {
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
        const check = await dateCheck.dateCheck();
        if (check) {
            const mail_info = req.body;
            const emailAddress = mail_info.email;
            try {

                const copy = await nodemailerHtml.getHtmlForm(mail_info);
                // console.log(copy);

                const mailOption = {
                    from: process.env.PIRO_MAIL,
                    to: emailAddress,
                    subject: `[피로그래밍 ${process.env.PIRO_LEVEL}기] 지원서 사본`,
                    html: copy
                };

                if (transporter.isIdle()) {
                    transporter.sendMail(mailOption);
                    return res.json({ status: true });
                } else {
                    mailOptions.push(mailOption);
                    console.log('mail pushed into queue...', mailOptions.length);
                    return res.json({ status: false });
                }
            } catch (error) {
                console.log('recruit controller error!!!!', error);
                return res.json({ status: false });
            }
        }
    }
}