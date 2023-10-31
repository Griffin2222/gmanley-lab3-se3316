const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const routerInfo = express.Router();
const routerPower = express.Router();
const port = 3000;
const superInfo = 'server/superhero_info.json';
const superPowers = 'server/superhero_powers.json';
const lists = 'server/list.json';
let superInfoJSON;
let superPowersJSON;

fs.readFile(superInfo, 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    superInfoJSON = JSON.parse(data);
})
fs.readFile(superPowers, 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    superPowersJSON = JSON.parse(data);
});


app.use(express.json());

// displays static webpage from index.html
app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

routerInfo.route('/filter').get((req, res) => {
        const { name, race, publisher, limit } = req.query;
        if(!name && !race && !publisher) return res.status(400).json('There must be at least one keyword...');
        let filteredData = superInfoJSON.filter(item =>
            (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
            (!race || item.Race.toLowerCase().includes(race.toLowerCase())) &&
            (!publisher || item.Publisher.toLowerCase().includes(publisher.toLowerCase()))
        );
        
        if (filteredData.length === 0) {
            return res.status(404).json('No matching data found!');
        }
        if(limit > 0 && limit < filteredData.length) {
            filteredData = filteredData.slice(0, limit);
            console.log(filteredData)
        }
        res.send(filteredData);
    })

routerPower.route('/:name')
    .get((req, res) => {
        const name = req.params.name;
        const powers = superPowersJSON.find(p => p.hero_names === name);
        if(!powers) return res.status(404).send(`There are no powers found for ${name}...`);
        res.send(powers);
    });

// routerInfo.route('/search/:id')
//     .get((req, res) => {
//         const id = req.params.id;
//         const hero = superInfoJSON.find(h => h.id === parseInt(id));
//         if(!hero) return res.status(404).json(`The superhero with ID ${id} was not found...`);
//         res.send(hero);
//     })



// routerInfo.route('/lists/:name')
//     .post((req, res) => {
//         fs.readFile(lists, 'utf-8', (err, data) => {
//             if(err) {
//                 res.status(500).send('Internal Server Error!');
//                 return;
//             }
//             let listsJSON = JSON.parse(data);
//         });
//         res.send(`New list called ${req.params.name} created succesfully!`);
//     });



app.use('/api/superheroes', routerInfo);
app.use('/api/powers', routerPower);

app.listen(port, () => console.log(`listening on port ${port}...`));