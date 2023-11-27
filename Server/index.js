
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const dbURI = 'mongodb+srv://griffin:Griffin22@cluster0.3bjuofm.mongodb.net/Superheroes?retryWrites=true&w=majority';
const Heros = require('./Models/heros');
const Powers = require('./Models/powers');
const ListItems = require('./Models/listItems');
const User = require('./Models/user');
const routerInfo = express.Router();
const routerPower = express.Router();
const port = 3000;



app.use(express.json());
app.use(cookieParser());

// displays static webpage from index.html
app.use('/', express.static(path.join(__dirname, '..', 'Client')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(`${req.method} request for ${req.url}`);
    next();
});


routerInfo.post("/register", async (req,res)=>{
   let email = req.body.email;
   let password = req.body.password;
   let name = req.body.name;

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const record = await User.findOne({email:email});

   if(record){
    return res.status(400).send({
        "message":"Email is already registered"
    })
   } else{

   const user = new User({
    name: name,
    email: email,
    password: hashedPassword
   })
   const result = await user.save();

   const{_id} = await result.toJSON();
   const token = jwt.sign({_id:_id}, "secret");
   res.cookie("jwt", token, {
    httpOnly:true,
    maxAge:24*60*60*1000
   })

   res.send({
    message:"success"
   })

//    res.json({
//     user:result
//    }) 
    }
})

routerInfo.post("/login", async(req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).send({
            message: "user not found",
        })
    }
    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).send({
            message: "Password is incorrect",
        })
    }
    const token = jwt.sign({_id:user._id},"secret key");
    res.cookie("jwt", token, {
        httpOnly:true,
        maxAge:24*60*60*1000
    })
res.send({
    message: "success"
})
})

routerInfo.get('/user', async(req,res)=>{
   try{
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, "secret");

    if(!claims){
        return res.status(401).send({
            message:"unauthenticated"
        });
    }
    const user = await User.findOne({_id:claims._id});
    const{password,...data} = await user.toJSON();
    res.send(data);

   }catch(err){
    return res.status(401).send({
        message: "unauthenticated"
    });
   }
   
    // res.send("user");
})

routerInfo.post("/logout", (req,res)=>{
    res.cookie("jwt", "", {maxAge: 0});
    res.send({
        message: "success",
    })
})
routerInfo.get("/getUsers", (req,res)=>{
    User.find({})
    .then((result)=>{
        res.send(result);
    });
})
routerInfo.get("/getUsers/:name", (req,res)=>{
    const name = req.params.name;
    User.find({name:name}).select('-_id -createdAt -updatedAt -__v')
    .then((result)=>{
        if(!result[0]) return res.status(404).send(`${name} has no users...`);
        res.send(result[0]);
    });
})


routerInfo.route('/lists')
    .get((req, res) => {
            ListItems.find({})
            .then((result) => {
                res.send(result);
            });
    })
    .post((req, res) => {
        if(!req.body.listName || req.body.listName.length > 20 || containsHTML(req.body.listName)) return res.status(400).send('Bad list name...');
        ListItems.find({listName: req.body.lName})
        .then(result => {
            if(result[0]) return res.status(409).send('List name unavailable...');
            else {
                const superList = new ListItems({
                    listName: req.body.listName,
                    ids: req.body.ids
                })
                superList.save()
                .then((result) => res.send(result))
                .catch((err) => console.log(err));
            }
        })
        .catch(err => console.log(err));
    });

    function containsHTML(input) {
        const htmlRegex = /<[^>]*>/;
        return htmlRegex.test(input);
    }

routerInfo.route('/lists/:id')
    .get((req, res) => {
        ListItems.find({}).skip(req.params.id-1).limit(1)
        .then((result) => {
            res.send(result[0]);
        })
        .catch((err) => console.log(err));
    })
    .put((req, res) => {
        if(!req.body.listName) return res.status(400).send('List name blank...');
        ListItems.find({listName: req.body.listName}).updateOne({ids: req.body.ids})
        .then((result) => {
            if(result.modifiedCount === 0) return res.status(404).send('List not found...');
            res.send(result);
        })
        .catch((err) => console.log(err));
    })
    .delete((req, res) => {
        if(!req.body.listName) return res.status(400).send('List name blank...');
        ListItems.find({listName: req.body.listName}).deleteOne()
        .then((result) => { 
            if(result.deletedCount === 0) return res.status(404).send('List not found...');
            res.send(result);
        })
        .catch((err) => console.log(err));
    });

routerInfo.route('/publishers')
    .get((req, res) => {
        Heros.find({}, 'publisher').select('-_id')
        .then((publishersDB => {
            const publishers = [];
            for(const p of publishersDB) {
                if(!publishers.includes(p.publisher) && p.publisher !== '') publishers.push(p.publisher);
            }
            res.send(publishers);
        }))
        .catch((err) => console.log(err));
    });
routerInfo.route('/filter')
    .get((req, res) => {
        const { name, race, publisher, power, limit } = req.query;
        if(!name && !race && !publisher && !power) return res.status(400).json('There must be at least one keyword...');
        Heros.find({$and: [
            name ? { name: new RegExp(name, 'i') } : {},
            race ? { race: new RegExp(race, 'i') } : {},
            publisher ? { publisher: new RegExp(publisher, 'i') } : {}
        ]}).select('-_id -createdAt -updatedAt -__v')
        .then((matchingHeroes) => {
            if(power) {
                const query = {};
                query[capitalize(power)] = "True";
                Powers.find(query).select('-_id -createdAt -updatedAt -__v')
                .then((result) => {
                    const matchingHeroNames = result.map(hero => hero.hero_names);
                    matchingHeroes = matchingHeroes.filter(hero => matchingHeroNames.includes(hero.name));
                    if (matchingHeroes.length === 0) {
                        return res.status(404).json('No matching data found...');
                    }
                    if(limit > 0 && limit < matchingHeroes.length) {
                        matchingHeroes = matchingHeroes.slice(0, limit);
                    }
                    res.send(matchingHeroes);
                })
                .catch((err) => console.log(err));
            } else {
                if (matchingHeroes.length === 0) {
                    return res.status(404).json('No matching data found...');
                }
                if(limit > 0 && limit < matchingHeroes.length) {
                    matchingHeroes = matchingHeroes.slice(0, limit);
                }
                res.send(matchingHeroes);
            }
        })
        .catch((err) => console.log(err));
    });

routerInfo.route('/powers/:name')
    .get((req, res) => {
        const name = req.params.name;
        Powers.find({hero_names: `${req.params.name}`}).select('-_id -createdAt -updatedAt -__v')
        .then((result) => {
            if(!result[0]) return res.status(404).send(`${name} has no powers...`);
            res.send(result[0]);
        })
        .catch((err) => console.log(err));
    });

routerInfo.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        Heros.find({id: `${req.params.id}`}).select('-_id -createdAt -updatedAt -__v')
        .then((result) => { 
            if(!result[0]) return res.status(404).send(`The superhero with ID ${id} was not found...`);
            res.send(result[0])
        })
        .catch((err) => console.log(err));
    });

routerInfo.route('/')
    .get((req, res) => {
        Heros.find({})
        .then((heroes) => {
            if(!heroes[0]) return res.status(404).send('no matches...');
            res.send(heroes);
        })
        .catch(err => console.log(err));
    });

    function capitalize(phrase) {
        phrase = String(phrase).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return phrase;
    }

app.use('/api/superheroes', routerInfo);

mongoose.connect(dbURI)
    .then(() => app.listen(port, () => console.log(`listening on port ${port}...`)))
    .catch((err) => console.log(err));
