const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('src'));

app.get('/', (request, response) => {
    response.sendFile('index.html')
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});