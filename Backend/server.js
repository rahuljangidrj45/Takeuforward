const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rahul@8058',
    database: 'bannerDB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.get('/api/banner', (req, res) => {
    const sql = 'SELECT * FROM banners LIMIT 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

app.post('/api/banner', (req, res) => {
    const { description, timer, link, isVisible } = req.body;
    const sql = 'UPDATE banners SET description=?, timer=?, link=?, isVisible=? WHERE id=1';
    db.query(sql, [description, timer, link, isVisible], (err, result) => {
        if (err) throw err;
        res.send('Banner updated');
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
