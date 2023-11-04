
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const routerInfo = express.Router();
const routerPower = express.Router();
const port = 3000;
const superInfo = 'server/superhero_info.json';
const superPowers = 'server/superhero_powers.json';
const lists = 'server/lists.json';
let superInfoJSON;
let superPowersJSON;
let listsJSON

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
fs.readFile(lists, 'utf8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    listsJSON = JSON.parse(data);
});

app.use(express.json());

// displays static webpage from index.html
app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

routerInfo.route('/lists')
    .get((req, res) => {
        res.send(listsJSON);
    })
    .post((req, res) => {
        if(!req.body.lName) return res.status(400).send('List name blank...');
        if(listsJSON.find(l => l.lName === req.body.lName)) return res.status(409).send('List name unavailable...');
        listsJSON.push(req.body);
        fs.writeFileSync(lists, JSON.stringify(listsJSON));
        res.send(req.body);
    })
    

routerInfo.route('/lists/:id')
    .get((req, res) => {
        res.send(listsJSON[req.params.id-1]);
    })
    .put((req, res) => {
        console.log(listsJSON.length)
        if(!req.body.lName) return res.status(400).send('List name blank...');
        if(listsJSON.length === 0 || listsJSON[req.params.id-1].lName !== req.body.lName) return res.status(404).send('List not found...');
        listsJSON[req.params.id-1] = req.body;
        fs.writeFileSync(lists, JSON.stringify(listsJSON));
        res.send(listsJSON);
    })
    .delete((req, res) => {
        listsJSON.splice(req.params.id-1, 1);
        fs.writeFileSync(lists, JSON.stringify(listsJSON));
        res.send(listsJSON)
    })

routerInfo.route('/publishers')
    .get((req, res) => {
        const publishers = [];
        for(const p of superInfoJSON) {
            if(!publishers.includes(p.Publisher) && p.Publisher !== '') publishers.push(p.Publisher);
        }
        res.send(publishers);
    });

routerInfo.route('/filter')
    .get((req, res) => {
        const { name, race, publisher, power, limit } = req.query;
        let matchingHeroes;
        if(!name && !race && !publisher && !power) return res.status(400).json('There must be at least one keyword...');
        else {
            matchingHeroes = superInfoJSON.filter(item =>
                (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
                (!race || item.Race.toLowerCase().includes(race.toLowerCase())) &&
                (!publisher || item.Publisher.toLowerCase().includes(publisher.toLowerCase()))
            );
        }
        
        if(power) {
            let filteredPowers = superPowersJSON.filter(item => item[capitalize(power)] === "True");
            const matchingHeroNames = filteredPowers.map(hero => hero.hero_names);
            matchingHeroes = matchingHeroes.filter(hero => matchingHeroNames.includes(hero.name));
        }
        
        if (matchingHeroes.length === 0) {
            return res.status(404).json('No matching data found...');
        }
        if(limit > 0 && limit < matchingHeroes.length) {
            matchingHeroes = matchingHeroes.slice(0, limit);
        }
        res.send(matchingHeroes);
    });

routerPower.route('/:name')
    .get((req, res) => {
        const name = req.params.name;
        const powers = superPowersJSON.find(p => p.hero_names === name);
        if(!powers) return res.status(404).send(`${name} has no powers...`);
        res.send(powers);
    });

routerInfo.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const hero = superInfoJSON.find(h => h.id === parseInt(id));
        if(!hero) return res.status(404).send(`The superhero with ID ${id} was not found...`);
        res.send(hero);
    });

// routerInfo.route('/search/:id')
//     .get((req, res) => {
//         const id = req.params.id;
//         const hero = superInfoJSON.find(h => h.id === parseInt(id));
//         if(!hero) return res.status(404).json(`The superhero with ID ${id} was not found...`);
//         res.send(hero);
//     })



// routerInfo.route('/lists/:name')
//     .post((req, res) => {
//         fs.readFile(lists, 'utf-8', (err, data) => {
//             if(err) {
//                 res.status(500).send('Internal Server Error!');
//                 return;
//             }
//             let listsJSON = JSON.parse(data);
//         });
//         res.send(`New list called ${req.params.name} created succesfully!`);
//     });



function capitalize(phrase) {
    phrase = String(phrase).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return phrase;
}

app.use('/api/superheroes', routerInfo);
app.use('/api/powers', routerPower);

app.listen(port, () => console.log(`listening on port ${port}...`));