var express = require('express'),
	app 	= express(),
	path 	= require('path');

app.use('/app', express.static(__dirname + '/app'));
app.use('/tests', express.static(__dirname + '/tests'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function(){
	console.log('Server started at localhost:3000');
})
