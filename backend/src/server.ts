import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import menadzerRouter from './routers/menadzer.routes';
import generalniRouter from './routers/generalni.routes';
import lekarRouter from './routers/lekar.routers';
import pacijentRouter from './routers/pacijent.routers';

const app = express();
app.use(cors())
app.use(express.json({limit:'100mb'}))

mongoose.connect('mongodb://127.0.0.1:27017/lekarska_ordinacija')
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('db connected')
})

const router = express.Router();
app.use('/',router);
router.use('/menadzer',menadzerRouter);
router.use('/nereg',generalniRouter);
router.use('/lekar',lekarRouter);
router.use('/pacijent',pacijentRouter);

 const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
app.use(bodyParser.json());
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'tediglisic@gmail.com',
//       pass: 'yvgzzwepadfhhxaz',
//     },
//   });

//   app.post('/send-email', (req, res) => {
  
//     const mailOptions = {
//       from: 'tediglisic@gmail.com',
//       to : 'tediglisic@gmail.com',
//       subject : "PROBA",
//       text : "Uspesna proba",
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         res.status(500).send('Error sending email');
//       } else {
//         console.log('Email sent: ' + info.response);
//         res.status(200).send('Email sent successfully');
//       }
//     });
//   });

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));