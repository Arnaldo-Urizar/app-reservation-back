require('dotenv').config()
const { google } = require('googleapis');

const authConfig = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
})

module.exports = authConfig