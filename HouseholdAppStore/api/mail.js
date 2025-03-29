const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    service:"gmail",
    auth:{
      user: 'tuandvmpd10690@gmail.com',
      pass: 'snox lcwh tdph xiiw'
    }
})
module.exports = transporter