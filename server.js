const express = require('express')

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
}
const app = express()
app.use(requireHTTPS)

app.use(express.static('./dist/smartops'))

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/smartops/' })
})

app.listen(process.env.PORT || 8080)