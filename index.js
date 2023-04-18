const express = require('express');
const db = require('./configs/db_connection');
const PORT = process.env.PORT || 8000;

const app = express();

// setting up ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routers/index'));

app.listen(PORT, (err) => {
    if(err){
       console.log(err); 
       return;
    }

    console.log(`server is running at ${PORT}`);
})