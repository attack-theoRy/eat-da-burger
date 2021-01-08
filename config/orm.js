
// import the connection from connection.js
var connection = require("../config/connection.js");

// Helper functions from the activities folder -=-------------

// Helper function for generating MySQL syntax (question marks)
// This helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
const createQuestionMarks = (num) => {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
  // Translates the array of strings to a single comma-separated string
	return arr.toString();
}

//Helper function to translate the object key/value pairs to SQL syntax
const objToSql = (ob) => {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}
  // Translates the array of strings to a single comma-separated string
	return arr.toString();
}

// Create the ORM object to perform SQL queries
var orm = {
	// Function that returns all rows from the burgers table
	selectAll: (tableInput, cb) => {
		// Construct the query string that returns all rows from the burgers table
		var queryString = "SELECT * FROM " + tableInput + ";";

		// Perform the database query
		connection.query(queryString, (err, result) => {
			if (err) {
				throw err;
			}

			// Return the response in callback
			cb(result);
		});
	},

	// Function that inserts a new row into the burgers table
	insertOne: (table, cols, vals, cb) => {
		// Construct the query string that inserts a single row into the burgers table
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += createQuestionMarks(vals.length);
		queryString += ") ";

		// Perform the database query
		connection.query(queryString, vals, (err, result) => {
			if (err) {
				throw err;
			}

			// Return response in callback
			cb(result);
		});
	},

	// Function that updates a single row in the burgers table
	updateOne: (table, objColVals, condition, cb) => {
		// Construct the query string that updates a single entry in the burgers table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// Perform the database query
		connection.query(queryString, (err, result) => {
			if (err) {
				throw err;
			}

			// Return response in callback
			cb(result);
		});
	},

	// Function that deletes a single row in the burgers table
	deleteOne: (table, condition, cb) => {
		var queryString = "DELETE FROM " + table + " WHERE " + condition;
	
		// Perform the database query
		connection.query(queryString, (err, res) => {
		  if (err) {
			throw err;
		  }
		  
		  // Return response in callback
		  cb(res);
		});
	  }
	};




module.exports = orm;