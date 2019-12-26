const mongoose = require('mongoose');

//Promise
mongoose.Promise = global.Promise;

var dbName = "shortly-depoly"
mongoURI = `mongodb://localhost/${dbName}`
mongoose.connect(mongoURI, { useMongoClient: true });

var db = mongoose.connection;

// add event open the connection and handle the error
mongoose.connection.once("open", () => {
  console.log("the connection was made")
}).on("error", (error) => {
  console.log("faild to connect to database")
})

module.exports.db = db;
