

import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
   service:'gmail',
   auth:{
    user:'Sandy31524@gmail.com',
    pass: process.env.GOOGLE_AUTH_PASS
   }
})

console.log(transport)