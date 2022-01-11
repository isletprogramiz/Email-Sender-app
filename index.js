const express  = require('express');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors');
require('dotenv').config()

const app = express();

//global middlewares
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());


app.use(express.static('./'))
app.get('/',(req,res)=> {
    res.sendFile('index.html');
})


var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

app.post('/mail', async (req ,res) => {
    try {
        const {from ,to ,subject , content} = req.body
        const mytransporter = await transporter.sendMail({
            from,
            to,
            content,
            subject
        })
        res.send('sent successfully')
    }
    catch(err)
    {
        res.send(err);
    }
})



app.listen(8000, ()=> {
    console.log("server running at port 8000");
})