const nodemailer = require("nodemailer");
const fs = require("fs")
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "", // generated ethereal user
            pass: "", // generated ethereal password
        },
    });

    let buffer = fs.readFileSync("/home/hunter/桌面/a.html");

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"hutao" <@qq.com>', // sender address
        to: "@gmail.com,", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: buffer.toString("utf8"), // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
