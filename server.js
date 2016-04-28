/**
 * Created by an.sokolov on 28.04.2016.
 */

var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function(req,res ) {
    switch (req.url) {
        case '/':
            sendFile('index.html', res);
            break;

        case '/subscribe':
            chat.subscribe(req, res);

            //..
            break;

        case '/publish':
            chat.publish('...');
            //...
            break;

        default:
            res.statusCode = 404;
            res.end("Not found");
    }
}).listen(3000);


function sendFile(fileName,res){
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on('error', function(){
            res.statusCode = 500;
            res.end("Server error");
        });
    fileStream.on("readable", write);

    function  write() {

        fileContent = fileStream.read();

        if(fileContent && !res.write(fileContent)){

            fileName.removeListener('readable', write);

            res.once('drain', function() {
                fileName.on('readable',write);
                write();
            });
          //  var fileContent = fileStream.read();
        //    res.end(fileContent);
            // res.end();
        }

    }
}