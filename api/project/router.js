// build your `/api/projects` router here
const express = require('express')

const router = express.Router();

router.get("/", (req, res, next) => {
    res.json('hey you made it')
})

module.exports = router
