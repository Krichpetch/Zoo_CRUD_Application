const Land_Animal = require('../models/Land_Animals');
const Aquatic_Animal = require('../models/Aquatic_Animals');
const Bird = require('../models/Birds');

// const express = require('express');
// const router = express.Router();

// Function to determine the model based on the route path
const getModel = (path) => {
    let Model;
    if (path.startsWith('/land_animals')) {
        Model = Land_Animal;
    } else if (path.startsWith('/aquatic_animals')) {
        Model = Aquatic_Animal;
    } else if (path.startsWith('/birds')) {
        Model = Bird;
    }
    return Model;
};


const getCollectionType = (path) => {
    let collectionType;
    if (path.startsWith('/zoo')) {
        collectionType = 'zoo';
    } else if (path.startsWith('/land_animals')) {
        collectionType = 'land_animals';
    } else if (path.startsWith('/aquatic_animals')) {
        collectionType = 'aquatic_animals';
    } else if (path.startsWith('/birds')) {
        collectionType = 'birds';
    }
    return collectionType;
};


const renderErrorPage = (res, err, title) => {
    console.error(err);
    res.render('500', { title: title });
};

const zoo_index = (req, res) => {
    const path = req.originalUrl; // Get the path from request object
    const collectionType = getCollectionType(path);

    res.render('zoo', { collectionType: collectionType, title: 'Zoo' });
};

const animal_index = (req, res) => {
    const path = req.originalUrl; // Get the path from request object
    const Model = getModel(path);
    const collectionType = getCollectionType(path);

    if (Model) {
        Model.find().sort({ createdAt: -1 })
            .then(result => {
                res.render('index', { animals: result, collectionType: collectionType, title: `All ${collectionType.charAt(0).toUpperCase() + collectionType.slice(1)}` });
            })
            .catch(err => renderErrorPage(res, err, 'All Animals'));
    } else {
        res.render('404', { title: 'Page not found' });
    }
};

const animal_details = (req, res) => {
    const id = req.params.id;
    const path = req.originalUrl; // Get the path from request object
    const collectionType = getCollectionType(path);

    const Model = getModel(path);
    if (Model) {
        Model.findById(id)
            .then(result => {
                if (result) {
                    res.render('details', { animal: result, collectionType: collectionType, title: 'Animal Details' });
                } else {
                    res.render('404', { title: 'Animal not found' });
                }
            })
            .catch(err => {
                console.error(err); // Log the error for debugging
                renderErrorPage(res, err, 'Animal Details');
            });
    } else {
        res.render('404', { title: 'Page not found' });
    }
};

const animal_create_get = (req, res) => {
    const path = req.originalUrl; // Get the path from request object
    const Model = getModel(path);
    const collectionType = getCollectionType(path);

    console.log("Collection Type:", Model);
    res.render('create', { collectionType: collectionType, title: `Insert new ${collectionType}`, endpoint: `/${collectionType}` });
};

const animal_create_post = (req, res) => {
    const path = req.originalUrl; // Get the path from request object
    const Model = getModel(path);
    const collectionType = getCollectionType(path);

    if (Model) {
        const animal = new Model(req.body);
        animal.save()
            .then(result => {
                res.redirect(`/${collectionType}`);
            })
            .catch(err => renderErrorPage(res, err, 'Create Animal'));
    } else {
        res.render('404', { title: 'Page not found' });
    }
};

const animal_update_get = (req, res) => {
    const id = req.params.id;
    const path = req.originalUrl; // Get the path from request object
    const collectionType = getCollectionType(path);
    const Model = getModel(path);

    if (Model) {
        Model.findById(id)
            .then(result => {
                if (result) {
                    res.render('edit', { animal: result, collectionType: collectionType, title: 'Edit Animal Detail' });
                } else {
                    res.render('404', { title: 'Animal not found' });
                }
            })
            .catch(err => renderErrorPage(res, err, 'Edit Animal Detail'));
    } else {
        res.render('404', { title: 'Page not found' });
    }
};

const animal_update_post = (req, res) => {
    const id = req.params.id;
    const path = req.originalUrl; // Get the path from request object
    const collectionType = getCollectionType(path);

    const Model = getModel(path);
    if (Model) {
        Model.findByIdAndUpdate(id, req.body, { new: true })
            .then(result => {
                res.redirect(`/${collectionType}`);
            })
            .catch(err => renderErrorPage(res, err, 'Update Animal'));
    } else {
        res.render('404', { title: 'Page not found' });
    }
};

const animal_delete = (req, res) => {
    const path = req.originalUrl; // Get the path from request object
    const collectionType = getCollectionType(path);
    const id = req.params.id;

    const Model = getModel(path);
    if (Model) {
        Model.findByIdAndDelete(id)
            .then(result => {
                res.json({ redirect: `/${collectionType}` });
            })
            .catch(err => renderErrorPage(res, err, 'Delete Animal'));
    } else {
        res.render('404', { title: 'Page not found' });
    }
};

module.exports = {
    zoo_index,
    animal_index,
    animal_details,
    animal_create_get,
    animal_create_post,
    animal_update_get,
    animal_update_post,
    animal_delete
};