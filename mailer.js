const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'slavafit@mail.ru', 
            pass: 'gY4mcmzuWF2ubduhr64n' 
        }
    },
    {
        from: 'Hola blyad'
    }
)


const mailer = (mailMessage) => {
    transporter.sendMail(mailMessage, (err, info) => {
        if(err) return console.log(err)
        // console.log('Email sent: ', info)
    })
}

module.exports = mailer