var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// ALL THE EXPRESS ROUTES
// GET route to get all burgers from the database
router.get('/', (req, res) => {
    burger.selectAll((data) => {
      var hbsObject = {
        burgers: data
      };

      console.log("selecting all");
      res.render('index', hbsObject);
    });
  });
  
  // POST route to insert a burger into the database
  router.post('/burgers', (req, res) => {
    burger.insertOne([
      'burger_name'
    ], [
      req.body.burger_name
    ], (data) => {
     res.redirect('/');
    });
  });
  
  // A PUT route to update a burger's devoured status
  router.put('/burgers/:id', (req, res) => {
    var condition = 'id = ' + req.params.id;

    console.log("update to devoured");
  
    burger.updateOne({
      devoured: true
    }, condition, (data) => {
      res.redirect('/');

    });
  });
  
    // A DELETE route to delete a burger that has been devoured
    router.delete("/burgers/:id", (req, res) => {
      var condition = "id = " + req.params.id;
      console.log("condition", condition);
  
      burger.deleteOne(condition, (data) => {
        res.redirect('/');

      });
    });
  


module.exports = router;