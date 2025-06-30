"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = require("nodemailer");
const randomstring_1 = require("randomstring");
async function sendMail(email) {
    const transport = (0, nodemailer_1.createTransport)({
        service: 'gmail',
        auth: {
            user: 'ahmadmayallo02@gmail.com',
            pass: 'sbanalzshwriouqn',
        },
    });
    const code = (0, randomstring_1.generate)({
        length: 6,
        charset: "hex"
    });
    const mailOptions = {
        from: "ahmadmayallo02@gmail.com",
        to: email,
        subject: "Hello from Nodemailer",
        text: `This is Code to reset password don't share it ${code}`,
    };
    try {
        await transport.sendMail(mailOptions);
        return code;
    }
    catch (error) {
        console.error(`Error Sending Email: ${error}`);
        throw new Error(`Error Sending Email: ${error}`);
    }
}
//# sourceMappingURL=transport.js.map