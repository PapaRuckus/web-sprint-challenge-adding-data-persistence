const express = require('express')

const projectsRouter = require('./project/router')


const server = express()

server.use(express.json())
server.use('/api/projects', projectsRouter)

server.get('*', (req, res, next) => {
    res.status(200).json('welcome to the main page')
})

server.use((err, req, res, next) => {// eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;