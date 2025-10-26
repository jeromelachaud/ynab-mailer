const nodemailer = require('nodemailer')
const Email = require('email-templates')
const config = require('../config')
const currencyFormatter = require('currency-formatter')

const mailer = async (transactions, template, recipient) => {
  // Do not send email if there's no transaction
  if (
    transactions === 404 ||
    transactions === undefined ||
    (Array.isArray(transactions) && transactions.length === 0)
  )
    return
  // - an empty array when there are no transactions
  if (
    transactions === 404 ||
    transactions === undefined ||
    (Array.isArray(transactions) && transactions.length === 0)
  )
    return
  try {
    const filteredTransactions = transactions
      .filter(
        (transaction) =>
          transaction.approved && transaction.category_name !== null
      )
      .map((transaction) => ({
        amount: currencyFormatter.format(transaction.amount / 1000, {
          code: 'EUR',
        }),
        category_name: transaction.category_name,
        memo: transaction.memo,
      }))

    const email = new Email({
      message: {
        from: `"Jerome" <${config.emailSender}>`,
        replyTo: `${config.emailReplyTo}`,
        to: recipient,
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
          weekly: {
            message:
              'Coucou ! 🤗 Voici les toutes dépenses enregistrées la semaine dernière 🗓',
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
