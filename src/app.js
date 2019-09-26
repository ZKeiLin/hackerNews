const express = require('express');
const path = require('path');
const request = require('request');
const hbs = require('hbs')

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'HAKCER NEWS',
    author: 'ZK Lin'
  });
})

app.listen(3000, () => {
  console.log('server is going log at 3000');
});