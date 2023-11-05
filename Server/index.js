
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const app = express();
const dbURI = 'mongodb+srv://griffin:Griffin22@cluster0.3bjuofm.mongodb.net/Superheroes?retryWrites=true&w=majority';
const Heros = require('./Models/heros');
const Powers = require('./Models/powers');
const ListItems = require('./Models/listItems');
const routerInfo = express.Router();
const routerPower = express.Router();
const port = 3000;


app.use(express.json());

// displays static webpage from index.html
app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

routerInfo.route('/lists')
    .get((req, res) => {
        
    })
    .post((req, res) => {
        
    })
    

routerInfo.route('/lists/:id')
    .get((req, res) => {
       
    })
    .put((req, res) => {
       
    })
    .delete((req, res) => {
        
    })

routerInfo.route('/publishers')
    .get((req, res) => {
        
    });

routerInfo.route('/filter')
    .get((req, res) => {
       
        
        
      
    });

routerPower.route('/:name')
    .get((req, res) => {
        
    });

routerInfo.route('/:id')
    .get((req, res) => {
        
    });









function capitalize(phrase) {
    phrase = String(phrase).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return phrase;
}

app.use('/api/superheroes', routerInfo);


mongoose.connect(dbURI)
    .then(() => app.listen(port, () => console.log(`listening on port ${port}...`)))
    .catch((err) => console.log(err));