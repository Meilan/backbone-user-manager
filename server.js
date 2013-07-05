


// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://localhost/contactlist_database' );
//mongoose.connect( 'mongodb://Meilan:flaalfks@ds033818.mongolab.com/contactlist_database' );

var Person = new mongoose.Schema({
	firstname: String,
	lastname: String,
	age: String
});

//Models
var PersonModel = mongoose.model( 'Person', Person );

// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//perform route lookup based on url and HTTP method
	app.use( app.router );

	//Where to serve static content
	app.use( express.static( path.join( application_root, 'site') ) );

	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
	response.send( 'User Manager API is running' );
});


//Get a list of all books
app.get( '/api/users', function( request, response ){

		return PersonModel.find( function( err, people ) {
		if( !err ) {
			return response.send( people );
			response.send( 'people' );

		} else {
			return console.log( err );
			response.send( 'error' );
		}
	});
});

//Get a single book by id
app.get( '/api/users/:id', function( request, response ) {
	return PersonModel.findById( request.params.id, function( err, person ) {
		if( !err ) {
			return response.send( person );
		} else {
			return console.log( err );
		}
	});
});

//Insert a new book
app.post( '/api/users', function( request, response ) {
	var person = new PersonModel({
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		age: request.body.age
	});
	person.save( function( err ) {
		if( !err ) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
	});
	return response.send( person );
});


//Update a book

app.put( '/api/users/:id', function( request, response ) {

	console.log( 'Updating person ' + request.body.firstname );

	return PersonModel.findById( request.params.id, function( err, person ) {
		person.firstname = request.body.firstname;
		person.lastname = request.body.lastname;
		person.age = request.body.age;

		return person.save( function( err ) {
			if( !err ) {
				console.log( 'person updated' );
			} else {
				console.log( err );
			}
			return response.send( person );
		});
	});
});

//Delete a book
app.delete( '/api/users/:id', function( request, response ) {
	console.log( 'Deleting person with id: ' + request.params.id );
	return PersonModel.findById( request.params.id, function( err, person ) {
		return person.remove( function( err ) {
			if( !err ) {
				console.log( 'Person removed' );
				return response.send( '' );
			} else {
				console.log( err );
			}
		});
	});
});


//Start server
var port = 4712;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});










/*

jQuery.ajax({
	url: '/api/users/51d4739e0bf6874227000011',
	type: 'PUT',
	data: {
		'firstname': 'Lan',
		'lastname': 'Me',
		'age': '2000'
	},
	success: function( data, textStatus, jqXHR ){
		console.log( 'Post response:' );
		console.dir( data );
		console.log( textStatus );
		console.dir( jqXHR );
	}
});


jQuery.get( '/api/users/51d459e3a0d06cc224000031', function( data, textStatus, jqXHR ){
	console.log( 'Get response:' );
	console.dir( data );
	console.log( textStatus );
	console.dir( jqXHR );
});

jQuery.post( '/api/users', {
	'firstname': 'Meilan Lin',
	'lastname': 'Meilan',
	'age': '123'
}, function( data, textStatus, jqXHR ){
	console.log( 'Post response:');
	console.dir( data );
	console.log( textStatus );
	console.dir( jqXHR );
});

jQuery.ajax({
	url: '/api/users/51d47441a8f9de4727000013',
	type: 'DELETE',
	success: function( data, textStatus, jqXHR ){
		console.log( 'Post response:' );
		console.dir( data );
		console.log( textStatus );
		console.log( jqXHR );
	} 
});

*/














