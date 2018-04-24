var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoClient = require('mongodb').mongoClient;

var mongodb;

app.use(bodyParser.json());

app.get('/', function(request, response){
    response.send('Hello world');
});

app.post('/savedetails', function(request, response){
    console.log(request.body);
    if(mongoClient != null && mongoClient != undefined){
        var resultObject = {};
        mongodb.collection('sample').insertionOne(request.body, function(error, result){
            if(error){
                resultObject.status  = "Fail";
                resultObject.statusCode = 401;
                resultObject.message = "Create New Record Failed!";
                respose.send(JSON.stringify(resultObject));
            }
            else{
                resultObject.status  = "Success";
                resultObject.statusCode = 200;
                resultObject.message = "Create New Record Success!";
                respose.send(JSON.stringify(resultObject));

            }
        });
    }
});

app.listen(5244, function(){
    console.log('Server running at http://localhost:5244');
    createMongoDbConnection();
});

function createMongoDbConnection(){

    if(mongoClient != null && mongoClient != undefined){
        mongoClient.connect('mongodb://localhost:27017/sample', function(error, dbInstance){
            if(error){
                mongodb = null;
                console.log('Mongodb connection creation failed');
            }
            else{
                mongodb = dbInstance;
                console.log('MongoDB connection Successfull');
            }
        });
    }

}
