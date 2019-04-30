// implement your API here
const express = require('express');
const server = express();

const db = require('./data/db.js');
server.use(express.json());

server.listen(4001, () => {
    console.log('*******server running*******');
})

server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: "The users information could not be retrieved." })
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if(user){
            res.status(200).json({
                success: true,
                user
            });
        }else {
            res.status(404).json({
                success: false,
                message:"The user the the specified ID does not exist."
            })
        }     
    })
    .catch(err => {
        res.status(500).json({message:"the users information could not be retrieved."})
    })
})

server.post('/api/users', (req, res) => {
    const user = req.body;

    if(!user.bio||!user.name){
        db
        .insert(user)
        .then(user => {
            res.status(400).json({errorMessage: "Please provide name and bio for the user." })
        })
        .catch(err => {
            res.status(500).json({ error:"There was an error while saving the user to the database" })
        })
    }else{
        db
        .insert(user)
        .then(user=> {
            res.status(201).json({ success: true, user })
        })
        .catch(err => {
            res.status(500).json({ error:"There was an error while saving the user to the database" })
        })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.
    remove(id)
    .then( deleted => {
        if(res===0){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }else{
            res.status(204).end()
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" })
    })
})

server.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const {name, bio} = req.body;

    db
    .update(id, user)
    .then(updated => {
        if(!id.includes(id)){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }else if(!name || !bio){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }else{
            res.status(200).json(updated)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
})