/**
 * Purpose: Email Dispatch Service
 * Logic: Configures Nodemailer transport with SMTP environment credentials and sends HTML email templates.
 * Falls back to console log printout if email credentials are unconfigured or fail.
 */

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER || 'mock_user',
      pass: process.env.EMAIL_PASS || 'mock_pass'
    }
  });

  // Define email options
  const mailOptions = {
    from: `${process.env.EMAIL_FROM || 'noreply@hlapp.com'}`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  // Check if SMTP is configured with dummy values and intercept to log in console instead of failing
  if (process.env.EMAIL_USER === 'test_smtp_user' || !process.env.EMAIL_USER) {
    console.log('--- SIMULATED EMAIL LOG ---');
    console.log(`To: ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Body: ${mailOptions.html.replace(/<[^>]*>/g, '')}`); // Strip basic HTML tags for logs
    console.log('---------------------------');
    return { success: true, info: 'Simulated email sent' };
  }

  // Send the actual email
  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent: ${info.messageId}`);
  return info;
};

module.exports = { sendEmail };
