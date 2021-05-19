const express = require('express');
const path = require('path');
const shortid = require('shortid');
const fs = require('fs');
let db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req,res) => {
    console.log(req.body)
    let x = 
    {
        id: shortid.generate(),
        title: req.body.title,
        text: req.body.text
    }
    console.log(x);
    db.push(x)
    fs.writeFile('./db/db.json', JSON.stringify(db), error =>{
        if (error) throw error;
        res.json(db);
    })
});

app.delete(`/api/notes/:id`, (req,res)=> {
    console.log(req.params)
    let desiredNote = 
    {
        id: req.params.id,
        // title: req.body.title,
        // text: req.body.text
    }

    console.log(desiredNote)
    db = db.filter(note => note.id !== req.params.id) 
    console.log(db)
    fs.writeFile('./db/db.json', JSON.stringify(db), error =>{
        if (error) throw error;
        res.json(db);
    })

})
// app.delete
//console.log(req.params)
//console.log(req.params.id)
//'/api/notes/:id'

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));