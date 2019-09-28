const express = require('express');
const path = require('path');
const hbs = require('hbs')
const getTopStories = require('./utils/getTopStories');
const getStories = require('./utils/getStory');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials')
const templatePath = path.join(__dirname, '../templates/views');


app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPath);


app.get('', (req, res) => {
  res.render('index', {
    title: 'HAKCER NEWS',
    author: 'ZK Lin'
  });
  
});

app.get('/hacker', (req, res) => {
  getTopStories((error, topStoriesData) => {
    if (error) {
      return res.send({ error });
    }
    var data = [];
    const count = 10;
    getStories(topStoriesData, count, (storiesError, storiesData) => {
      if (storiesError) {
        return res.send({storiesError});
      }
      data.push(storiesData);
      if (data.length === count) {
        res.send(data);
      }
    })
  })
})

app.listen(3000, () => {
  console.log('server is going log at 3000');
});

