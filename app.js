var express = require('express');
var server = express();

// For parameters 
server.use(express.urlencoded());
server.use(express.bodyParser());

// Global variable
var students = [];

for ( i = 0 ; i < 50 ; i++ ) {
	var student = {
		id : i,
		name : "Student " + i,
		city : "Murcia",
		photo : "http://dummyimage.com/150x150/009fad/ffffff.png&text=" + i
	};
	students.push(student)
}

server.post("/students", function(req,res) {

	console.log("Adding student");
	console.log("Uploading " + req.files.image.originalFilename);

	// Parameters
	var name = req.body.name
	var city = req.body.city;

	// Data validation
	if(typeof name == 'undefined') {
		res.status(400).send("Missing some parameters");
		return;
	}

	// Create student 
	var student = {
		id : students.length,
		name : name,
		city : city,
		photo : "http://dummyimage.com/150x150/009fad/ffffff.png&text=" + students.length
	};
	students.push(student);

	res.status(200).send(student);
});

server.get('/students', function(req, res) {
	res.send(students);
});

console.log("Server started");
server.listen(9999);
