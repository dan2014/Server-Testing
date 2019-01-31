const express = require('express');

const app = express();
let nextId = 7;

function getNewId() {
  return nextId++;
}

let friends = [
  {
    id: 1,
    name: 'Ben',
    age: 30,
    email: 'ben@lambdaschool.com',
  },
  {
    id: 2,
    name: 'Austen',
    age: 32,
    email: 'austen@lambdaschool.com',
  },
  {
    id: 3,
    name: 'Ryan',
    age: 35,
    email: 'ryan@lambdaschool.com',
  },
  {
    id: 4,
    name: 'Sean',
    age: 35,
    email: 'sean@lambdaschool.com',
  },
  {
    id: 5,
    name: 'Michelle',
    age: 67,
    email: 'michelle@gmail.com',
  },
  {
    id: 6,
    name: 'Luis',
    age: 47,
    email: 'luis@lambdaschool.com',
  },
];

app.use(express.json());

app.get('/friends', (req, res) => {
  res.status(200).json(friends);
});

app.post('/friends', (req, res) => {
if(Object.keys(req.body).length>0){
    const friend = { id: getNewId(), ...req.body };
    friends = [...friends, friend];
    res.status(201).json(friends);
} else {
    res.status(500).send("No data was received");
}
 
});

app.put('/friends/:id', (req, res) => {
  const { id } = req.params;
  let friendIndex = friends.findIndex(friend => friend.id == id);

  if (friendIndex >= 0) {
    friends[friendIndex] = { ...friends[friendIndex], ...req.body };
    res.status(200).json(friends);
  } else {
    res
      .status(404)
      .json({ message: `The friend with id ${id} does not exist.` });
  }
});

app.delete('/friends/:id', (req, res) => {
    const { id } = req.params;
    let friendIndex = friends.findIndex(friend => friend.id == id);
    if (friendIndex >= 0) {
        friends = friends.filter(friend => friend.id != req.params.id);
        res.status(200).json(friends);
    } else{
        res
        .status(404)
        .json({ message: `The friend with id ${id} does not exist.` });
    }
});

module.exports = app;
