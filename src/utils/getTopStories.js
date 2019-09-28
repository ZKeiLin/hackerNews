const request = require('request');

const getTopStories = function (callback) {
    const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    request({ url: topStoriesUrl, json:true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the service', undefined);
        } else if (!response.body) {
            callback('Unable fetch data', undefined);
        } else {
            callback(undefined, response.body);
        }
    });
}

module.exports = getTopStories;
