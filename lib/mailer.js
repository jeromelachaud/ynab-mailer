const nodemailer = require('nodemailer')
const Email = require('email-templates')
const config = require('../config')
const currencyFormatter = require('currency-formatter')

const mailer = async (transactions, template) => {
  try {
    const filteredTransactions = transactions
      .filter(
        transaction =>
          transaction.approved && transaction.category_name !== null
      )
      .map(transaction => ({
        amount: currencyFormatter.format(transaction.amount / 1000, {
          code: 'EUR',
        }),
        category_name: transaction.category_name,
        memo: transaction.memo,
      }))

    const email = new Email({
      message: {
        from: `"Jerome" <${process.env.EMAIL_SENDER}>`,
        replyTo: `${process.env.EMAIL_REPLY_TO}`,
        cc: `${process.env.EMAIL_CC}`,
        to: `${process.env.EMAIL_RECIPIENT}`,
      },
      preview: true,
      send: true,
      transport: nodemailer.createTransport(
        config.smtpSettings[process.env.NODE_ENV].transporter
      ),
    })

    email
      .send({
        template: `${template}`,
        locals: {
          daily: {
            message:
              'Coucou ! 🤗 Voici les dépenses enregistrées depuis hier 📅',
          },
          monthly: {
            message:
              'Coucou ! 🤗 Voici les toutes dépenses enregistrées le mois dernier 🗓',
          },
          filteredTransactions,
        },
      })
      .then(console.log)
      .catch(console.error)
  } catch (error) {
    console.log(error)
  }
}

module.exports = mailer
