module.exports = {
  token: `Bearer ${process.env.YNAB_API_KEY}`,
  budgetId: process.env.BUDGET_ID,
  accountId: process.env.ACCOUNT_ID,
  emailRecipient1: process.env.EMAIL_RECIPIENT_1,
  emailRecipient2: process.env.EMAIL_RECIPIENT_2,
  emailSender: process.env.EMAIL_SENDER,
  emailReplyTo: process.env.EMAIL_REPLY_TO,
  smtpSettings: {
    development: {
      transporter: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    },
    production: {
      transporter: {
        host: 'in-v3.mailjet.com',
        port: 587,
        auth: {
          user: process.env.MAILJET_USER,
          pass: process.env.MAILJET_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    },
  },
}
