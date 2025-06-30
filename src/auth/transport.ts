import { createTransport } from "nodemailer";
import { generate } from "randomstring";
import Mail from "nodemailer/lib/mailer";

export async function sendMail(email: string) {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        user: 'ahmadmayallo02@gmail.com',
        pass: 'sbanalzshwriouqn',
      },
    });
    const code: string = generate({
        length: 6,
        charset: "hex"
    })
    const mailOptions: Mail.Options = {
        from: "ahmadmayallo02@gmail.com",
        to: email,
        subject: "Hello from Nodemailer",
        text: `This is Code to reset password don't share it ${code}`,
    };
    try {
        await transport.sendMail(mailOptions);
        return code;
    } catch (error: any) {
        console.error(`Error Sending Email: ${error}`);
        throw new Error(`Error Sending Email: ${error}`);
    }
}