const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path'); // Ensure path is included
const Place = require('./models/Place.js');
require('dotenv').config();

const app = express();
const jwtSecret = 'fsadfasfnxcv234';  // Use this consistently
const saltRounds = 12;

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
}));

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// API Routes

// Register new user
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = bcryptjs.hashSync(password, saltRounds);
        const userDoc = await UserModel.create({ name, email, password: hashedPassword });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email });
    if (userDoc) {
        const passOk = bcryptjs.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('Invalid password');
        }
    } else {
        res.status(404).json('User not found');
    }
});

// Get user profile
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const user = await UserModel.findById(userData.id);
            res.json(user);
        });
    } else {
        res.json(null);
    }
});

// Logout
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

// Upload photo by link
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: path.join(__dirname, 'uploads', newName),
    });
    res.json('/uploads/' + newName);
});

// Upload photos
const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    req.files.forEach((file) => {
        const { path: tempPath, originalname } = file;
        const ext = originalname.split('.').pop();
        const newPath = tempPath + '.' + ext;
        fs.renameSync(tempPath, newPath);
        const relativePath = newPath.replace(__dirname + '/uploads/', '');
        uploadedFiles.push(relativePath);
    });
    res.json(uploadedFiles);
});

// Places API
app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description, price,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            price, title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests,
        });
        res.json(placeDoc);
    });
});

// Get user's places
app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const userPlaces = await Place.find({ owner: userData.id });
        res.json(userPlaces);
    });
});

// Get a specific place
app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

// Update a place
app.put('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        } else {
            res.status(403).json('Unauthorized');
        }
    });
});

// Get all places
app.get('/places', async (req, res) => {
    res.json(await Place.find());
});

// Server and database connection
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
