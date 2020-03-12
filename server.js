const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {getMedia} = require('./insta')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/media/', async (req,res)=>{
    var url = req.query.url;
    console.log(req.query)
    await getMedia(url, (data)=>{
        res.json(data);
    })
});

app.listen(3000,(err)=>{
    if(!err){
        console.log(`server started`)
    } else {
        console.log('an error occured!')
    }
})