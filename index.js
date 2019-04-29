// implement your API here
const express = require('express');
const server = express();

const db = require('./data/db');
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

server.get('api/users/:id', (req, res) => {
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
        res.status(500).json({message:"he users information could not be retrieved."})
    })
})
