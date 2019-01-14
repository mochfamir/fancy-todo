const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');

module.exports = {
  hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash
  }, 
  comparePassword(password, hash) {
    let result = bcrypt.compareSync(password, hash);
    return result
  },
  generateToken(id, email) {
    let token = jwt.sign({ id, email }, 'shhhhh');
    return token
  },
  decodeToken(token) {
    let decoded = jwt.verify(token, 'shhhhh');
    return decoded
  },
  sendEmail(email) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${email}`,
      from: 'test@example.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
  }
}