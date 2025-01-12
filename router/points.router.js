const express = require('express');
const router = express.Router();
const pointsController = require('../controller/points.controller');
router.route('/add/:userId')
          .post(pointsController.addPoints);
router.route('/getUserPoints/:userId')
          .get(pointsController.getUserPoints);
router.route('/getTopUsers')
          .get(pointsController.getTopUsers);
          
                   
           

module.exports = router;
