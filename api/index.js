const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const secret = bcryptjs.genSaltSync(12);
const jwtSecret = 'fsadfasfnxcv234' ;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173','http://127.0.0.1/5173']
}));


// mongoose.connect('mongodb+srv://fahim:amrbracunest665@cluster0.nluvtan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req,res) => {
    res.json('test ok');
});

app.post('/register', async (req,res) =>{
    const {name,email,password} = req.body;
    try { 
        const userDoc = await UserModel.create({
            name,
            email,
            password:bcryptjs.hashSync(password, secret),
    
        });
        res.json(userDoc);
    } catch (e){
        res.status(422).json(e);
    }
    
    
});


app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await UserModel.findOne({email});
    if (userDoc){
        const passOk = bcryptjs.compareSync(password, userDoc.password);
        if (passOk){
            jwt.sign({email:userDoc.email,
                id : userDoc._id}, jwtSecret, {},(err, token) => {
                    if (err) throw err;
                    res.cookie('token',token).json(userDoc);
                });
            } else {
                res.status(422).json('pass not ok');
            }
        } else {
            res.json('user not found');
        }
    });


app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token){
        jwt.verify(token, jwtSecret, {}, async(err, userData)=> {
        if (err) throw err; 
        const {name, email, _id} = await UserModel.findById(userData.id);
        res.json({name, email, _id});
        });
    } else{
        res.json(null);
    }
});

app.post('/logout', (req, res) =>{
    res.cookie('token', '').json(true);
});

app.listen(4000);