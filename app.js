const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const zooRoutes = require('./routes/zooRoutes');
const landAnimalRoutes = require('./routes/landAnimalRoutes');
const aquaticAnimalRoutes = require('./routes/aquaticAnimalRoutes');
const birdRoutes = require('./routes/birdRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://Petch:29012547@animals.hpxj54n.mongodb.net/Animals?retryWrites=true&w=majority&appName=Animals";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// routes
app.get('/', (req, res) => {
    res.redirect('/zoo');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Zoo routes
app.use('/zoo', zooRoutes);
app.use('/land_animals', landAnimalRoutes);
app.use('/aquatic_animals', aquaticAnimalRoutes);
app.use('/birds', birdRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});