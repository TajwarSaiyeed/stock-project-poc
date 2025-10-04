import nodemailer from 'nodemailer'
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

export const sendWelcomeEmail = async ({email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Stock Project" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: 'Welcome to Stock Project - Your stock market toolkit is ready!',
        html: htmlTemplate,
        text: "Thanks for joining Stock Project. You now have the tools to track markets and make smarter moves."
    }

    await transporter.sendMail(mailOptions)
}