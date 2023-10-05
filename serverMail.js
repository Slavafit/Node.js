const express = require('express');
const bodyParser = require('body-parser');
const mailer = require('./mailer');

const app = express();

const PORT = process.env.PORT || 3001
let user = undefined

app.use(express.json());
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/registration', (req, res) => { 
    if(!req.body.email || !req.body.password) return res.sendStatus(400)
    const message = {
        from: 'slavafit@mail.ru',        
        to: req.body.email,
        subject: 'Congratulations! You are successfully registred on our site',
        html: `
        <h2>Congratulations! You are successfully registred on our site!</h2>
        
        <i>your account information:</i>
        <ul>
            <li>login: ${req.body.email}</li>
            <li>password: ${req.body.password}</li>
        </ul>
        
        <p>This letter does not require a reply.<p>`
    }
    mailer(message);
    res.send(`Регистрация ${req.body.email} прошла успешно! Письмо отправлено на указанный email.`);
    
    
});
app.get('/registration', (req, res) => { 
    if(typeof user !== 'object') return res.sendFile(__dirname + '/registration.html')   
    res.send(`Регистрация прошла успешно! Данные учетной записи отправлены на email: ${user.email}`) 
    user = undefined
})
app.get('/unsubscribe/:email', (req, res) => {
    console.log(`${req.params.email} unsubscribed`)
    res.send(`Ваш email: ${req.params.email} удален из списка рассылки!`)
})

app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/registration`))