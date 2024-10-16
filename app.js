let express = require('express');
const mongodbconnect = require('./src/helper/db.connect_database');

let app = express(); 


app.get('/', (req, res) => {
    res.send('i am running');
});


mongodbconnect()

app.listen(8000, () => {
    console.log('Server is running on http://localhost:3000');
});
