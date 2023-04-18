const express = require('express');
const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
    res.end('<h1>welcome</h1>');
});

app.listen(PORT, (err) => {
    if(err){
       console.log(err); 
       return;
    }

    console.log(`server is running at ${PORT}`);
})