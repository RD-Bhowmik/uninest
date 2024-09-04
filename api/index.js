const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require("multer"); 
const fs = require("fs");


require('dotenv').config();
const app = express();

const secret = bcryptjs.genSaltSync(12);
const jwtSecret = 'fsadfasfnxcv234' ;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
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

// Only works with http links unfortunately :(( , thik krte parle janais
console.log({__dirname});
app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const  newName = 'photo' + Date.now() + '.jpg' ;
    await imageDownloader.image({
        url : link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({dest:"uploads/"});
app.post("/upload",photosMiddleware.array("photos",100) ,(req,res) =>{
    const uploadedFiles = [];
    for (let i=0; i<req.files.length; i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split(".");
        const ext =  parts[parts.length-1];
        const newPath = path +"." + ext; 
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("uploads/",""));
    }
    res.json(uploadedFiles);
});

app.listen(4000);