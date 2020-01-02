var express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
// Getting data in json format
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.static("views"));

app.get('/', function(req,res){
  res.render('index.ejs');
});

app.get('/expressupload', function(req,res){
  res.render('expressUpload.ejs');
});

app.get('/multer', function(req,res){
  res.render('multerUpload.ejs');
});

app.get('/done', function(req,res){
  res.render('done.ejs');
});

app.post('/upload', function(req, res){
    console.log(req.files.foo);
    if(req.files){
    var uploadedFile = req.files.foo;
    uploadedFile.mv(__dirname + '/public/uploadedData/' + req.files.foo.name, function(err){
      if(err){
        console.log('Some error occured');
        console.log(err);
        res.redirect('/');
      }else{
        console.log('DONE!!!!!!!!!!!!!!!!!');
        res.redirect('/done');
      }
    });
    }
});

app.listen(3000 || process.env.PORT, function(req,res){
  console.log('Server running successfully.');
});
