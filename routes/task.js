const express = require('express');
const taskController = require('../controllers/task');
const router = express.Router();
const app = express();

let apiHitCounter = 0;

const calculateApiHit = app.use((req, res, next) => {
    apiHitCounter++;
    next();
}) 


router
    .post('/task', calculateApiHit, taskController.create)
    .patch('/task/:id', calculateApiHit, taskController.update)
    .get('/task', taskController.findAll)
    .get('/task/:id', taskController.findOne)
    .get('/count', (req, res) => {
        res.status(200).json({
            status: true,
            data: apiHitCounter
        })
    })


module.exports = router;