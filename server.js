var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

require('./models/users');
require('./models/posts');
const Users = mongoose.model('Users')
const Posts = mongoose.model('Posts')

const requiredAuth = require('./middleware/authverify')

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const MONGO_URI=process.env.MONGO_URI;
const JWT=process.env.JWT;

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('connected', ()=>{
    console.log("Database connected!");
})

db.on('error', (err)=>{
    console.log("Error occured!", err);
})

const middleWare = (req, res, next) => {
    next();
}

app.get('/feed', (req, res)=>{
   // console.log(req,res)
    Posts.find()
    .populate("author", "_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json(posts)
        //console.log(posts)
    })
});

app.get('/profile/:id', (req, res)=>{
    Posts.find({author: req.params.id })
        .populate("author","_id name")
        .sort('-createdAt')
        .then(post=>{
           console.log(post)
            res.json({post, name: post[0].author.name})
        })
});

app.get('/blog/:id', (req, res)=>{
    Posts.findOne({_id: req.params.id })
        .populate("author","_id name")
        .then(post=>{
           console.log(post)
            res.json(post)
        })
});

app.post('/addpost', requiredAuth, (req, res)=>{
    const {title, tag, body, image} = req.body;
    var post = new Posts({
        title: title,
        tag: tag,
        body: body,
        image: image,
        author: req.user,
        date: new Date().toLocaleString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    });
    
    
    post.save(function(err, story) {
        if (err) throw err;
        res.json(story)
    })
})


app.post('/profile', (req, res)=>{
    //console.log(req.body.id)
    //console.log(req.params.username)
        Posts.find({author: req.body.id })
        .populate("author","id name")
        .sort('-createdAt')
        .then(post=>{
           // console.log(post)
            res.json(post)
        })

});

app.post('/signin', (req, res)=>{
    Users.findOne({ username: req.body.userName, password: req.body.passWord },  function(err, users) {
        if(users){
            const token = jwt.sign({_id:users._id},JWT)
            const {_id,name,username,email} = users
            res.json({token,user:{_id,name,username,email}})
        }
        
        else if(req.body.userName.length==0 || req.body.passWord.length==0 ){
            return res.status(422).json({
                error: "Please Enter all credentials!"
            });
         }
    
        else{
           // throw err;
            return res.status(422).json({
                error: "Invalid credentials!"
            });  
        }
    });
})

app.post('/signup', (req, res)=>{
    
    if(req.body.fullName.length ==0 || req.body.userName.length==0 || req.body.email.length==0 || req.body.passWord.length==0){
        return res.status(422).json({
            error: "Please Enter all credentials!"
        });
    }
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(req.body.email)){
        return res.status(422).json({
            error: "Enter a valid email!"
        });
    }
    if(req.body.passWord.length < 6){
        return res.status(422).json({
            error: "Password should be atleast 6 characters long!"
        });
    }
    if(req.body.userName.length > 20 || req.body.userName.length < 2){
        return res.status(422).json({
            error: "User name must be within 2 to 10 characters."
        });
    }

    var user = new Users({
        name: req.body.fullName,
        username: req.body.userName,
        email: req.body.email,
        password: req.body.passWord
    });
    
    
    Users.findOne({ username: req.body.userName, password: req.body.passWord },  function(err, users) {
       // if (err) throw err;
        console.log(users);
        if(users){
            return res.status(422).json({
                error: "User already exists!"
            });
            
        }
       
        else {
            user.save(function(err) {
                if (err) throw err;
                res.json({data:users, message:"success"})
                //const token = jwt.sign({_id: users._id}, JWT)
            });
        }
    });
})

app.delete('/deletepost/:postId', requiredAuth,(req, res)=>{
    Posts.findOne({_id: req.params.postId})
    .populate("author", "_id")
    .exec((err, post)=>{
        if(err || !post){
            return res.status(422).json({error: err})
        }
        if(post.author._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

const env=process.env.NODE_ENV;
console.log(env);

if(process.env.NODE_ENV==="production"){
    app.use(express.static('blogfeed/build'))
    const path = require('path')
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'blogfeed', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT)
