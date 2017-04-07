var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  //var allChoice = prompt("Type 'all' and press enter to display all restaurants' names: ");
  var input = prompt("Find a restaurant, Type ADD to add, EDIT to edit, or DELETE to delete ");
  
  if (input == "ADD") {
  	var newResturant =  {
    	name: null,
    	address: null,
     	street: null,
        zipcode: null
    }
  	let restaurantName = prompt("Name: ");
  	newResturant.name = restaurantName;
  	let restaurantAddress = prompt("Address: ");
  	newResturant.address = restaurantAddress;
  	let restaurantStreet = prompt("Street: ");
  	newResturant.street = restaurantStreet;
  	let restaurantZip = prompt("Zip: ");
  	newResturant.Zip = restaurantZip;

  	collection.insert(newResturant);

  	collection.find().toArray(function(err, doc){
    	console.log(doc);
	});
  } else if (input == "EDIT") {
  	var editResturant;
  	var selectRestaurant = prompt("Type Name of Restaurant to edit: ");
  	collection.find({name: selectRestaurant}).forEach(function(doc){
	  	editResturant = doc;
	  	console.log("Editing " + doc.name);
	  	let restaurantAddress = prompt("Address: ");
	  	editResturant.address = restaurantAddress;
	  	let restaurantStreet = prompt("Street: ");
	  	editResturant.street = restaurantStreet;
	  	let restaurantZip = prompt("Zip: ");
	  	editResturant.Zip = restaurantZip;
	  	collection.update(editResturant);
	  });
  } else if (input == "DELETE") {
    var deleteResturant;
    var selectRestaurant = prompt("Type Name of Restaurant to delete: ");
    collection.find({name: selectRestaurant}).forEach(function(doc){
     deleteResturant = doc;
      console.log("Deleting " + doc.name);
      collection.remove({name: deleteResturant.name});
   });
  } else {
	  collection.find({name: input}).forEach(function(doc){
        console.log(doc);
	  });
  }
});