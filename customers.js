var mongo = require("mongodb");
var client = mongo.MongoClient;

client.connect("mongodb://localhost", function(err, db) {
  if (err)
    throw err;

  var newDB = db.db("CustomersDB");
  var userObj = [{
    firstName: "Hala",
    lastName: "Joudeh",
    Email: "1079949@students.adu.ac.ae",
    Password: "adu@123"
  },
  {
    firstName: "Alliza",
    lastName: "Duran",
    Email: "1075204@students.adu.ac.ae",
    Password: "adu@456"
  }];
  newDB.collection("Users").insertMany(userObj, function(err, result) {
    if (!err)
      console.log("A collection is created");
  });
});
