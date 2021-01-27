var express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var multer= require('multer');
// Getting data in json format
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.static("views"));
var {v4} = require("uuid");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*"); //'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get('/', function(req,res){
  // console.log(v4());
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
    const name = v4() + Date.now() + '.jpg';
    uploadedFile.mv(__dirname + '/views/' + name, function(err){
      if(err){
        console.log('Some error occured');
        console.log(err);
        res.redirect('/');
      }else{
        console.log('DONE!!!!!!!!!!!!!!!!!');
        var url = 'https://localhost:8000/' + name;
        // res.render('done.ejs',{url:url});
        return res.send(name);
      }
    });
    }
});

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './views/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.get('/getfile', async(req, res)=>{
  return res.send('')
});


app.listen(process.env.PORT||8000, function(req,res){
  console.log('Server running successfully.');
});
