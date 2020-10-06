const low = require('lowdb');
const express = require('express');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const database = low(adapter)
const app = express();

app.use(express.static('public'));

function addCookie(cookie) {
    database.get('cookies').push(cookie).write();
}

function getCookies() {
    return database.get('cookies').value();
}

app.post('/api/cookies/add', (req, res) => {
    const cookie = {
        auth: req.query.auth,
        value: req.query.value
    }
    addCookie(cookie);

    let response = {
        success: true,
        message: 'Cookie added!'
    }

    res.send(JSON.stringify(response));
})

app.get('/api/cookies/get', (req, res) => {
    let allCookies = getCookies();
    res.send(JSON.stringify(allCookies));
});


app.listen(9000);
