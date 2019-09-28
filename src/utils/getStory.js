const request = require('request');

const getStories = function (list, count, callback) {
    let data = [];
    for (let i = 0; i < count; i++) {
        const apiUrl = `https://hacker-news.firebaseio.com/v0/item/${list[i]}.json?print=pretty`;
        let response = request({ url: apiUrl, json: true }, (error, response) => {
            if (error) {
                callback('Unable to connect to the service', undefined);
            }
            else if (!response.body || response.body == null) {
                callback('Unable to find post', undefined);
            }
            else {
                callback(undefined, response.body);
            }
        });
    }
}


module.exports = getStories;