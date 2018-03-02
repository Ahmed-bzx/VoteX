const express = require('express');
const router = express.Router();
const Poll = require('../models/poll');


// get user if authanticated
router.get('/api/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404);
  }
});


// get all polls from db
router.get('/api/polls', (req, res) => {
  Poll.find({}, 'title options author.name createdAt',(err, polls) => {
    if (err) {
      console.log(err);
    } else {
      res.json(polls);
    }
  });
});

// get all polls for a specific user by ID
router.get('/api/polls/:id', (req, res) => {
  Poll.find({ 'author.id': req.params.id }, 'title options author.name createdAt',(err, polls) => {
    if (err) {
      console.log(err);
    } else {
      res.json(polls);
    }
  });
});


// get a single poll by ID
router.get('/api/poll/:id', (req, res) => {
  let pollId = req.params.id;

  Poll.findById(pollId, (err, poll) => {
    if (err) {
      console.log(err);
    } else {
      res.json(poll);
    }
  });
});


// add new poll to db
router.post('/api/newpoll', (req, res) => {
  new Poll({
    title: req.body.title,
    options: req.body.options,
    author: { id: req.body.user.id, name: req.body.user.name },
  }).save()

  res.sendStatus(200);
});


// delete a poll
router.delete('/api/delete/:id', (req, res) => {
  Poll.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  })
});


// submite a vote
router.post('/api/vote', (req, res) => {

  // this route will receive the poll and the selected option
  let poll = req.body.poll;
  let selectedOption = req.body.option;

  // find the selected option and add 1 point to it
  let indexOfSelectedOption = poll.options.findIndex(i => i.option === selectedOption);
  poll.options[indexOfSelectedOption].points += 1;

  Poll.findByIdAndUpdate(poll._id, poll, (err, poll) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});


module.exports = router;
