const nodemailer = require("nodemailer");

export async function sendMail(Email: string) {

  let configEmail = {
    user: '',
    pass: '',
  }
  
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: configEmail.user, // generated ethereal user
      pass: configEmail.pass, // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: configEmail.user, // sender address
    to: Email, // list of receivers
    subject: "Despesa Cadastrada", // Subject line    
    html: "<b>Uma despesa foi cadastrada para o seu usuário.</b>", // html body
  });

}