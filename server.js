const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.send('Hello...')
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})