var express = require('express')
var path = require('path') 
var app = express()
var session = require('express-session');
var ejs = require('ejs')
var nodemailer = require('nodemailer');
var multer = require('multer');
var passport = require('passport');

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(session({secret: "xYzUCAchitkara"}));

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/cqdatabse';

mongoose.connect(mongoDB);

mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
    console.log('DB connected');
});



var productSchema = new mongoose.Schema({
    email: String,
	password: String,
	gender : String,
	name: String,
	city: String,
	dob : String,
	phone : String,
	role: String,
	flag: Number,
	status: String,
	photoname: {type : String , default : 'dp.png'},
	githubid : String,
	owned : Array,
	join : Array,
	request : Array
  })
  
var instance = mongoose.model('admins', productSchema);

var tagSchema = new mongoose.Schema({
	tag : String,
	createDate : String,
	creator : String
})

var tag_instance = mongoose.model('tags', tagSchema);

var comSchema = new mongoose.Schema({
	cName: String,
	cRule : String,
	cLoc : { type : String , default : 'NotAdded' },
	cOwner : String,
	cOwnerId : String,
	cDate : String,
	cStatus : { type : String , default : 'Deactive'},
	cDesc : String,
	photoname: {type : String , default : 'cpic2.jpg'},
	requestedMembers : Array,
	joinedMembers : Array
})

var com_instance = mongoose.model('communities', comSchema);

//---------------------------------------------------
 /*var cmSchema = new mongoose.Schema({
  communityid : String,
  ownerid : String,
  requestedMembers : Array,
  joinedMembers : Array
})

var cm = mongoose.model('communityMember',cmSchema);
                                               
var mcSchema = new mongoose.Schema({
  memberid: String,
 
  ownedCommunities: Array,
  requestedCommunities: Array,
  joinedCommunities: Array
})

var mc = mongoose.model('memberCommunity',mcSchema);
*/
//------------------------------------------------------------------
  
function logger(req,res,next)
{
    // console.log(req.path, new Date().toLocaleString());
    console.log("hello logger");
   if(req.session.isLogin==1)
   next();
   else
   {
    res.redirect('/out');
   }
}

function adminlogger(req,res,next)
{
    // console.log(req.path, new Date().toLocaleString());
    console.log("admin logger");
   if(req.session.role=="Superadmin")
   next();
   else
   {
    res.redirect('/out');
   }
}
 
  
  app.post('/login',function (req, res)
  {
	  console.log(req.body);
	 instance.find({
		email : req.body.username,
		password : req.body.password
		
	})
	 .then(data => {
     //console.log(data);
     //res.send(data);
	 if(data.length>0)
	 {
		console.log("valid user");
		console.log(req.session.data);
		
			req.session.isLogin = 1;
			req.session._id = data[0]._id;
			req.session.email=data[0].email;
			req.session.password = data[0].password;
			req.session.gender=data[0].gender;
			req.session.city=data[0].city;
			req.session.dob = data[0].dob;
			req.session.phone=data[0].phone;
			req.session.role = data[0].role;
			req.session.name = data[0].name;
			req.session.flag = data[0].flag;
			req.session.status = data[0].status;
			req.session.photoname = data[0].photoname;
			
			console.log("------______________");
			console.log(req.session);
			console.log("------______________");
			//res.send(req.session);
			if(req.session.flag==0)
				res.send("notActive")
			else{
			if(req.session.status == "Confirmed")
			{
			if(req.session.role == "User")
				res.send("User");
			else if(req.session.role == "Community Builder")
				res.send("Community Builder")
			else
				res.send("Admin")
			}
			
			if(req.session.status == "Pending")
			{
				res.send("Pending")
			}
			}
		
	 }
	 else{
		 res.send("Invalid User");
	 }
	 
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })
      // res.send("user valid");
  });
  
  //--------GITHUB LOGIN--------------------
  var gituid;
         var GitHubStrategy = require('passport-github').Strategy;

          app.use(passport.initialize());
          app.use(passport.session());

          passport.serializeUser(function(user,done){
              done(null,user);
          });

          passport.deserializeUser(function(user,done){
              done(null,user);
          });

          passport.use(
                new GitHubStrategy({
                clientID: '68aeb4674fd616e671d2',
                clientSecret: '66a2b774fc43a626fcfe31c18ec9b0fbb668a0ce',
                callbackURL: "/auth/github/callback",
                session:true
                },function(accessToken, refreshToken, profile, cb) {
                    console.log('###############################');
                    console.log('passport callback function fired');
                     console.log(profile);
                    console.log("-----------profile ka khtm---------------");
                    return cb(null,profile);

                })
            );
	
		app.get('/auth/github',
      passport.authenticate('github'));
	app.get('/auth/github/callback',passport.authenticate('github', { failureRedirect: 'login.html' }), function (req, res)
      {

          console.log("githubsignin succesful");

          instance.find({
            githubid : req.session.passport.user._json.id
          })
          .then(data =>
          {
            if(data.length>0)
            {
              console.log("-----------MIL GEYA---------");
              console.log(data);
              //req.session.islogin = 1;
             // var obj = Object();
              req.session.isLogin = 1;
              req.session.email = data[0].email ;
              req.session.city=data[0].city;
              req.session.role=data[0].role;
              req.session.name=data[0].name;
              req.session.status=data[0].status;
              req.session.flag=data[0].flag;
              req.session.githubid = data[0].githubid;
              req.session.photoname= data[0].photoname;
              if(data[0].gender)
              {
                req.session.gender = data[0].gender;
                req.session.phone = data[0].phone;
                req.session.dob = data[0].dob;
              }
              req.session._id=data[0]._id;
            //  req.session.data=obj;
              console.log('github login successful')
              //console.log(obj)
              console.log("------------added--------------");
              res.redirect('/home');
            }
            else
            {
              console.log("nahi MILA==-===-0=-0-=0786789809");
              var obj = {
              name : req.session.passport.user._json.name,
              email : req.session.passport.user._json.email,
              city : req.session.passport.user._json.location,
              status : "Pending",
              role : "User",
              githubid : req.session.passport.user._json.id,
              photoname : "dp.png",
              flag : 1,
              }
              instance.create(obj,function(error,result)
              {
                if(error)
                throw error;
                else {
                 // req.session.data = obj;
				 req.session.name = obj.name;
				 req.session.email = obj.email;
				 req.session.city = obj.city;
				 req.session.status = obj.status;
				 req.session.role = obj.role;
				 req.session.githubid = obj.githubid;
				 req.session.photoname = obj.photoname;
				 req.session.flag = obj.flag;
                  instance.find({
                      githubid : req.session.passport.user._json.id
                  })
                  .then(data =>
                  {
                    req.session._id = data[0]._id;
                    console.log("89456123168645312658645312\n"+req.session.data);
                  })
                  .catch(err =>
                  {
                    throw err;
                  })
                  res.redirect('/pending');
                }
              })
            }
          })
          .catch(err =>
          {
            res.send(err)
          })
      })  
	

  
  //------------------------------------------------------
  
  app.get('/home',function(req,res)
  {
	  console.log("-----------------------")
	  console.log(req.session)
	  console.log(req.session.data)
	  console.log("-----------------------")
	  
	 res.render('profile',{obj : req.session});

  });
  app.get('/adduser',logger,adminlogger,function(req,res)
  {
	 res.render('useradd',{obj : req.session}) 
  });

  app.get('/pending',logger,function(req,res)
  {
	 res.render('pending',{obj : req.session}) 
  });
  
  
  app.post('/add',logger,adminlogger,function(req,res){
   console.log(req.body);
   
   	var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'upasana12000@gmail.com',
    pass: 'rohini1973'
  },
   tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
  from: 'upasana1200@gmail.com',
  to: req.body.email,
  subject: 'This mail is from CQ',
  text: "Hi welcome to CQ. \n Your username : "+req.body.email+"\n your password : "+req.body.password
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
   
   
  let newProduct = new instance({
    name: req.body.name,
	email: req.body.email,
	password: req.body.password,
	phone : req.body.phone,
	city : req.body.city,
	role : req.body.role,
	flag : 1,
	status : "Pending"
	
  })
  newProduct.save()
   .then(data => {
     console.log(data)
     res.send(data)
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })
  
})
app.get('/changepassword',logger,adminlogger,function(req,res)
{
	res.render('changepswd',{obj : req.session})
}); 
app.put('/changeP',logger,function(req,res){
    console.log(req.body);
    instance.findOneAndUpdate(
    {
        name: req.session.name,	
		password: req.session.password
    }, 
    {
      password: req.body.nameNew   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})
app.get('/out',function(req,res)
{
	req.session.isLogin = 0;
	req.session.destroy();
	res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('logOut');
});

app.get('/tag',logger,adminlogger,function(req,res)
{
	res.render('tagPanel',{obj : req.session})
});

app.get('/userslist',logger,adminlogger,function(req,res)
{
	res.render('usersList',{obj : req.session})
}); 

app.get('/list',logger,function(request,response)
    {
      var data = instance.find({}).exec(function(error,result)
      {
        if(error)
        throw error;
        else
        response.send(JSON.stringify(result))
      })
    })
 
  app.post('/addtag',logger,function(req,res){
   console.log(req.body);
  let newPro = new tag_instance({     /* for tag */
    tag : req.body.tag,
	createDate : req.body.date,
	creator : req.session.email
	
  })
  newPro.save()
   .then(data => {
     console.log(data)
     res.send(data)
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })
  
});
 
 app.get('/tagslist',logger,adminlogger,function(req,res)
{
	res.render('tagsList',{obj : req.session})
}); 
 
 app.get('/listOfTag',logger,function(request,response)
    {
      var data = tag_instance.find({}).exec(function(error,result)
      {
        if(error)
        throw error;
        else
        response.send(JSON.stringify(result))
      })
    })
	
app.delete('/deltag',logger,function(req,res)
{
	tag_instance.deleteOne({tag: req.body.dateTag},function(err,result)
		{
			if(err)
				throw err;
			else
			{
				console.log(result);
				res.send("deleted successfully");
			}
		});
})	
 
  app.get('/edit',logger,function(req,res)
{
	res.render('editHome',{obj : req.session})
}); 
 
   app.get('/editProfile',logger,function(req,res)
{
	res.render('profileEdit',{obj : req.session})
}); 
 
app.get('/clist',logger,adminlogger,function(req,res)
{
	res.render('cList',{obj : req.session})
}); 

app.get('/cl',logger,function(request,response)
    {
      var data = com_instance.find({}).exec(function(error,result)
      {
        if(error)
        throw error;
        else
        response.send(JSON.stringify(result))
      })
    })
  
    app.post('/cl',logger,function (req, res) {
      console.log("req aayi");
      var count;
      console.log(req.body);

      if(req.body.order[0].column==0)
      {
        if(req.body.order[0].dir=="asc")
        getdata("cName",1);
        else
        getdata("cName",-1);
      }
      else if(req.body.order[0].column==1)
      {
        if(req.body.order[0].dir=="asc")
        getdata("cRule",1);
        else
        getdata("cRule",-1);
      }
      else if(req.body.order[0].column==2)
      {
        if(req.body.order[0].dir=="asc")
        getdata("cLoc",1);
        else
        getdata("cLoc",-1);
      }
      else if(req.body.order[0].column==3)
      {
        if(req.body.order[0].dir=="asc")
        getdata("cOwner",1);
        else
        getdata("cOwner",-1);
      }
      else if(req.body.order[0].column==4)
      {
        if(req.body.order[0].dir=="asc")
        getdata("cDate",1);
        else
        getdata("cDate",-1);
      }

      else {
        getdata("cName",1);
      }


      function getdata(colname,sortorder)
      {

          com_instance.countDocuments(function(e,count){
            var start=parseInt(req.body.start);
            var len=parseInt(req.body.length);
            var mrule=req.body.cRule;
            var search=req.body.search.value;
            var getcount=10;
            console.log(req.body.search.value.length);


          var findobj={};
            console.log(mrule);
            if(mrule!="all")
               { findobj.cRule=mrule;}
            else{
                delete findobj["cRule"];
            }
            if(search!='')
                findobj["$or"] = [{
                "cName":  { '$regex' : search, '$options' : 'i' }
            }, {
                "cRule":{ '$regex' : search, '$options' : 'i' }
            },{
                "cLoc": { '$regex' : search, '$options' : 'i' }
            }
            ,{
                "cOwner":  { '$regex' : search, '$options' : 'i' }
            }
            ,{
                "cDate": { '$regex' : search, '$options' : 'i' }
            }]
            else
              delete findobj["$or"];

            com_instance.find(findobj).countDocuments(function(e,coun){
            getcount=coun;
          }).catch(err => {
            console.error(err)
            res.send(error)
          })

            com_instance.find(findobj).skip(start).limit(len).sort({[colname] : sortorder})
            .then(data => {
                res.send({"recordsTotal" : count,"recordsFiltered" :getcount,data})
              })
              .catch(err => {
                console.error(err)
              //  res.send(error)
              })
            })
          }
        });
  
 app.put('/deactivateUser',logger,function(req,res){
    console.log(req.body);
    instance.findOneAndUpdate(
    {
       email : req.body.flagNew
    }, 
    {
      flag : 0   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
}) 

 app.put('/activateUser',logger,function(req,res){
    console.log(req.body);
    instance.findOneAndUpdate(
    {
       email : req.body.flagNew
    }, 
    {
      flag : 1   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

app.post('/updateuser',logger,function(request,response)
    {
      console.log(request.body);
      instance.updateOne({"_id":request.body._id},{ $set : request.body} ,function(error,result)
      {
        if(error)
        throw error
        else
        {
          response.send("DATA UPDATED SUCCESFULLY")
        }
      })
    }) 


app.put('/updateCom',logger,function(req,res){
    console.log(req.body);
    com_instance.findOneAndUpdate(
    {
		_id : req.body._id,
     //   cName: req.body.cName,	
		//cStatus: req.body.cStatus
    }, 
    {
      cName : req.body.cName, 	  // field:values to update
	 cStatus : req.body.cStatus
	},
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
}) 

 app.put('/adminEdit',logger,function(req,res){
    console.log(req.body);
    instance.findOneAndUpdate(
    {
       email : req.session.email,
    }, 
    {
      name : req.body.name,
	  dob : req.body.dob,
	  phone : req.body.phone,
	  city : req.body.city,
	  gender: req.body.gender
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})

 app.put('/updateUserInUL',logger,function(req,res){
    console.log(req.body);
    instance.findOneAndUpdate(
    {
       email : req.body.old_e,
    }, 
    {
      email : req.body.nemail,
	  status : req.body.nstatus,
	  phone : req.body.nphone,
	  city : req.body.ncity,
	  role: req.body.nrole
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
}) 

 app.get('/superadmin',logger,function(req,res)
{
	res.render('userEditHome',{obj : req.session})
}); 

 app.get('/userEdit',logger,function(req,res)
{
	res.render('userProfileEdit',{obj : req.session})
}); 

app.get('/usercp',logger,function(req,res)
{
	res.render('userChangePswd',{obj : req.session})
});

app.get('/userComP',logger,function(req,res)
{
	res.render('userCommPanel',{obj : req.session})
});

app.get('/userUserSearch',logger,function(req,res)
{
	res.render('userSearch',{obj : req.session})
});

 app.get('/groups',logger,function(req,res)
{
	res.render('commPanel')
});
 
  app.get('/addCommunity',logger,function(req,res)
{
	res.render('addComm',{obj : req.session})
});

/*
app.post('/ul',function(req,res)
    {//find({}).skip(5).limit(5)
      console.log(req.body);
	  console.log(req.body.draw);
      instance.find({}, {
        "email" : 1,
        "phone" : 1,
        "city" : 1,
        "status" : 1,
        "role" : 1,
        "_id" : 0
      }).skip(0).limit(parseInt(req.body.length))
      .then(data => {
        var cnt;
        instance.countDocuments(function(err,count)
        {
          if(err)
          throw err;
          cnt=parseInt(count);
          console.log(cnt);
        });
         console.log("Total data length "+cnt);
        res.send({"recordsTotal":cnt,"recordsFiltered":cnt,data})
      })
      .catch(err=> {
        console.log(err);
        res.send(err);
      })
      // var data = product.find({}).exec(function(error,result)
      // {
      //   if(error)
      //   throw error;
      //   else
      //   res.send(JSON.stringify(result))
      // })
    })
	*/
	/*
	app.post('/ul' , function(req, res) {

    instance.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);

      instance.find({

      }).skip(start).limit(len)
    .then(data=> {
      res.send({"recordsTotal": count, "recordsFiltered" : count, data})
     })
     .catch(err => {
      res.send(err)
     })
   });
  })
  */
 //-----------------------------------------------------------
 /*
app.post('/ul',function (req, res) {
console.log(req.body);
console.log(req.body.order[0].column);
var count;

if(req.body.order[0].column==0)
{
  if(req.body.order[0].dir=="asc")
  getdata("email",1);
  else
  getdata("email",-1);
}
else if(req.body.order[0].column==1)
{
  if(req.body.order[0].dir=="asc")
  getdata("phone",1);
  else
  getdata("phone",-1);
}
else if(req.body.order[0].column==2)
{
  if(req.body.order[0].dir=="asc")
  getdata("city",1);
  else
  getdata("city",-1);
}
else if(req.body.order[0].column==3)
{
  if(req.body.order[0].dir=="asc")
  getdata("status",1);
  else
  getdata("status",-1);
}
else if(req.body.order[0].column==4)
{
  if(req.body.order[0].dir=="asc")
  getdata("role",1);
  else
  getdata("role",-1);
}

else {
  getdata("email",1);
}

//----------------------------------------------------------------
/*
   if(req.body.role === 'All' && req.body.status === 'All')
    {
        instance.find({} , {} , {skip : parseInt(req.body.start) , limit : parseInt(req.body.length) } , function (err , data)
        {
            if(err)
            {
                console.log(err);
                return;
            }
            else
                console.log(data);
                instance.countDocuments(function(err , count)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        if (req.body.search.value)
                        {
                            data = data.filter((value) => {
                                return value.email.includes(req.body.search.value)
                            })
                        }
                        res.send({"recordsTotal": count, "recordsFiltered": data.length, data});
                    }
                });
        })
    }
    else if(req.body.role === 'All' && req.body.status !== 'All')
    {
        instance.find({status: req.body.status} , {} , {skip : parseInt(req.body.start) , limit : parseInt(req.body.length) } , function (err , data)
        {
            if(err)
            {
                console.log(err);
                return;
            }
            else
                console.log(data);
            instance.countDocuments(function(err , count)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    if (req.body.search.value)
                    {
                        data = data.filter((value) => {
                            return value.email.includes(req.body.search.value)
                        })
                    }
                    res.send({"recordsTotal": count, "recordsFiltered": data.length, data});
                }
            });
        })
    }
    else if(req.body.role !== 'All' && req.body.status === 'All')
    {
        instance.find({adminType: req.body.role} , {} , {skip : parseInt(req.body.start) , limit : parseInt(req.body.length) } , function (err , data)
        {
            if(err)
            {
                console.log(err);
                return;
            }
            else
                console.log(data);
            instance.countDocuments(function(err , count)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    if (req.body.search.value)
                    {
                        data = data.filter((value) => {
                            return value.email.includes(req.body.search.value)
                        })
                    }
                    res.send({"recordsTotal": count, "recordsFiltered": data.length, data});
                }
            });
        })
    }
    else
    {
        instance.find({role: req.body.role, status: req.body.status} , {} , {skip : parseInt(req.body.start) ,
            limit : parseInt(req.body.length) } , function (err , data)
        {
            if(err)
            {
                console.log(err);
                return;
            }
            else
                console.log(data);
            instance.countDocuments(function(err , count)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    if (req.body.search.value)
                    {
                        data = data.filter((value) => {
                            return value.email.includes(req.body.search.value)
                        })
                    }
                    res.send({"recordsTotal": count, "recordsFiltered": data.length, data});
                }
            });
        })
    }


//----------------------------------------------------------



function getdata(colname,sortorder)
{
    instance.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);
      var role=req.body.role;
      var status=req.body.status;
      var search=req.body.search.value;
      var getcount=10;
      console.log(req.body.search.value.length);


    var findobj={};
      console.log(role,status);
      if(role!="All")
         { findobj.role=role;}
      else{
          delete findobj["role"];
      }
      if(status!="All")
          {findobj.status=status;}
      else{
          delete findobj["status"];
      }
      if(search!='')
          findobj["$or"]= [{
          "email":  { '$regex' : search, '$options' : 'i' }
      }, {
          "phone":{ '$regex' : search, '$options' : 'i' }
      },{
          "city": { '$regex' : search, '$options' : 'i' }
      }
      ,{
          "status":  { '$regex' : search, '$options' : 'i' }
      }
      ,{
          "role": { '$regex' : search, '$options' : 'i' }
      }]
      else{
          delete findobj["$or"];
      }


      instance.find(findobj).countDocuments(function(e,coun){
      getcount=coun;
    }).catch(err => {
      console.error(err)
      res.send(error)
    })




      instance.find(findobj).skip(start).limit(len).sort({[colname] : sortorder})
      .then(data => {
          res.send({"recordsTotal" : count,"recordsFiltered" :getcount,data})
        })
        .catch(err => {
          console.error(err)
        //  res.send(error)
        })
    });
  }
})
//-------------------------------------------------------
*/
/*
app.post('/ul' , function(req, res) {

  console.log(req.body.status)
  console.log(req.body.role)
  var flag;

  if(req.body.role === 'All' && req.body.status === 'All')
  {
      instance.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);
      instance.find({
      }).skip(start).limit(len)
    .then(data=> {
      if (req.body.search.value)
                    {
                        data = data.filter((value) => {
            flag = value.email.includes(req.body.search.value) || value.phone.includes(req.body.search.value)
             || value.city.includes(req.body.search.value) || value.status.includes(req.body.search.value) 
             || value.role.includes(req.body.search.value);
            return flag;
          })
                    }   
      res.send({"recordsTotal": count, "recordsFiltered" : count, data})
     })
     .catch(err => {
      res.send(err)
     })
   });
  }

  else if(req.body.role === 'All' && req.body.status !== 'All')
  {
  console.log(req.body);
  var length;
      instance.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);

      instance.find({status: req.body.status}).then(data => length = data.length);

      instance.find({ status: req.body.status }).skip(start).limit(len)
    .then(data=> {
      if (req.body.search.value)
                    {
                  data = data.filter((value) => {
            flag = value.email.includes(req.body.search.value) || value.phone.includes(req.body.search.value)
             || value.city.includes(req.body.search.value) || value.status.includes(req.body.search.value) 
             || value.role.includes(req.body.search.value);
            return flag;
          })
                    }
      res.send({"recordsTotal": count, "recordsFiltered" : length, data})
     })
     .catch(err => {
      res.send(err)
     })
   });  
  }

  else if(req.body.role !== 'All' && req.body.status === 'All')
  {
       console.log(req.body);
  var length;
      instance.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);

      instance.find({role: req.body.role}).then(data => length = data.length);

      instance.find({ role: req.body.role }).skip(start).limit(len)
    .then(data=> {
       if (req.body.search.value)
                    {
                        data = data.filter((value) => {
            flag = value.email.includes(req.body.search.value) || value.phone.includes(req.body.search.value)
             || value.city.includes(req.body.search.value) || value.status.includes(req.body.search.value) 
             || value.role.includes(req.body.search.value);
            return flag;
          })
                    }
      res.send({"recordsTotal": count, "recordsFiltered" : length, data})
     })
     .catch(err => {
      res.send(err)
     })
   }); 
  }

  else
  {
       var length;
      instance.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);

      instance.find({role: req.body.role, status: req.body.status}).then(data => length = data.length);

      instance.find({role: req.body.role, status: req.body.status}).skip(start).limit(len)
    .then(data=> {
       if (req.body.search.value)
                    {
                        data = data.filter((value) => {
            flag = value.email.includes(req.body.search.value) || value.phone.includes(req.body.search.value)
             || value.city.includes(req.body.search.value) || value.status.includes(req.body.search.value) 
             || value.role.includes(req.body.search.value);
            return flag;
          })
                    }
      res.send({"recordsTotal": count, "recordsFiltered" : length, data})
     })
     .catch(err => {
      res.send(err)
     })
   }); 
  }
});
*/
 
 app.post('/ul',logger,function (req, res) {
    console.log(req.body);
    console.log(req.body.order[0].column);
    var count;

    if(req.body.order[0].column==0)
    {
      if(req.body.order[0].dir=="asc")
      getdata("email",1);
      else
      getdata("email",-1);
    }
    else if(req.body.order[0].column==1)
    {
      if(req.body.order[0].dir=="asc")
      getdata("phone",1);
      else
      getdata("phone",-1);
    }
    else if(req.body.order[0].column==2)
    {
      if(req.body.order[0].dir=="asc")
      getdata("city",1);
      else
      getdata("city",-1);
    }
    else if(req.body.order[0].column==3)
    {
      if(req.body.order[0].dir=="asc")
      getdata("status",1);
      else
      getdata("status",-1);
    }
    else if(req.body.order[0].column==4)
    {
      if(req.body.order[0].dir=="asc")
      getdata("role",1);
      else
      getdata("role",-1);
    }

    else {
      getdata("email",1);
    }


    function getdata(colname,sortorder)
    {
        instance.countDocuments(function(e,count){
          var start=parseInt(req.body.start);
          var len=parseInt(req.body.length);
          var role=req.body.role;
          var status=req.body.status;
          var search=req.body.search.value;
          var getcount=10;
          console.log(req.body.search.value.length);


        var findobj={};
          console.log(role,status);
          if(role!="All")
             { findobj.role=role;}
          else{
              delete findobj["role"];
          }
          if(status!="All")
              {findobj.status=status;}
          else{
              delete findobj["status"];
          }
          if(search!='')
              findobj["$or"]= [{
              "email":  { '$regex' : search, '$options' : 'i' }
          }, {
              "phone":{ '$regex' : search, '$options' : 'i' }
          },{
              "city": { '$regex' : search, '$options' : 'i' }
          }
          ,{
              "status":  { '$regex' : search, '$options' : 'i' }
          }
          ,{
              "role": { '$regex' : search, '$options' : 'i' }
          }]
          else{
              delete findobj["$or"];
          }


          instance.find(findobj).countDocuments(function(e,coun){
          getcount=coun;
        }).catch(err => {
          console.error(err)
          res.send(error)
        })




          instance.find(findobj).skip(start).limit(len).sort({[colname] : sortorder})
          .then(data => {
              res.send({"recordsTotal" : count,"recordsFiltered" :getcount,data})
            })
            .catch(err => {
              console.error(err)
            //  res.send(error)
            })
        });
      }
    })
 

app.post('/sendMail',logger,function(req,res)
{
	var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'upasana12000@gmail.com',
    pass: 'rohini1973'
  },
   tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
  from: 'upasana1200@gmail.com',
  to: req.body.receiver,
  subject: 'This mail is from CQ',
  html: req.body.mbody
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})


var photoName ;

var storage = multer.diskStorage({
  destination : './public/uploads/',
  filename : function(req, file, callback)
  {
    photoName='/'+file.fieldname + '-' + Date.now() + '@' +path.extname(file.originalname)
    callback(null,photoName);
  }
})

var upload = multer({
  storage : storage
}).single('myImage');

app.post('/upload',(req,res) => {
  upload(req,res,(err)=>{
    if(err)
    {
      throw error;
    }
    else{
      console.log(req.file);
      console.log(photoName);
      console.log(req.session._id);

      instance.updateOne({ "_id" : req.session._id } , { $set : { "photoname" : photoName } }  ,function(error,result)
      {
        console.log(result);
        if(error)
          {
            console.log("error vale mai");
            throw error;
          }
        else
        {
          console.log("update vale mai");
          req.session.photoname = photoName;
         console.log(req.session);
          console.log(req.session.photoname);
          res.render('profile', { obj : req.session });
        }
      })
  }
})
});
// USER SIDE ------------------------------------------
  app.get('/uhome',logger,function(req,res)
  {
	  console.log("-----------------------")
	  //console.log(req.session)
	  console.log(req.session.data)
	  console.log("-----------------------")
	  
	 res.render('uProfile',{obj : req.session});

  });
  
    app.get('/uchangepassword',logger,function(req,res)
  {
 
	 res.render('uChangePswd',{obj : req.session});

  });

    app.get('/uedithome',logger,function(req,res)
  {
	 
	  res.render('uEditHome',{obj : req.session});

  });

    app.get('/ueditProfile',logger,function(req,res)
  {
	 
	  res.render('uProfileEdit',{obj : req.session});

  });
  
     app.get('/ugroups',logger,function(req,res)
  {
	 
	  res.render('uCommPanel',{obj : req.session});

  });
  
  app.get('/uUserSearch',logger,function(req,res)
  {
	 
	  res.render('uSearch',{obj : req.session});

  });

app.post('/useruploadpic',(req,res) => {
  upload(req,res,(err)=>{
    if(err)
    {
      throw error;
    }
    else{
      console.log(req.file);
      console.log(photoName);
      console.log(req.session._id);

      instance.updateOne({ "_id" : req.session._id } , { $set : { "photoname" : photoName } }  ,function(error,result)
      {
        console.log(result);
        if(error)
          {
            console.log("error vale mai");
            throw error;
          }
        else
        {
          console.log("update vale mai");
          req.session.photoname = photoName;
         console.log(req.session);
          console.log(req.session.photoname);
          res.render('uProfile', { obj : req.session });
        }
      })
  }
})
});

// COMMUNITY BUILDER SIDE -------------------------------------
 app.get('/chome',logger,function(req,res)
  {
	  console.log("-----------------------")
	  //console.log(req.session)
	  console.log(req.session.data)
	  console.log("-----------------------")
	  
	 res.render('cProfile',{obj : req.session});

  });
  
    app.get('/cchangepassword',logger,function(req,res)
  {
 
	 res.render('cChangePswd',{obj : req.session});

  });

    app.get('/cedithome',logger,function(req,res)
  {
	 
	  res.render('cEditHome',{obj : req.session});

  });

    app.get('/ceditProfile',logger,function(req,res)
  {
	 
	  res.render('cProfileEdit',{obj : req.session});

  });

app.post('/cuploadpic',(req,res) => {
  upload(req,res,(err)=>{
    if(err)
    {
      throw error;
    }
    else{
      console.log(req.file);
      console.log(photoName);
      console.log(req.session._id);

      instance.updateOne({ "_id" : req.session._id } , { $set : { "photoname" : photoName } }  ,function(error,result)
      {
        console.log(result);
        if(error)
          {
            console.log("error vale mai");
            throw error;
          }
        else
        {
          console.log("update vale mai");
          req.session.photoname = photoName;
         console.log(req.session);
          console.log(req.session.photoname);
          res.render('cProfile', { obj : req.session });
        }
      })
  }
})
});

app.post('/cpicupload',(req,res) => {
  upload(req,res,(err)=>{
    if(err)
    {
      throw error;
    }
    else{
      console.log(req.file);
      console.log(photoName);
      console.log(req.session._id);

      com_instance.updateOne({ "cOwnerId" : req.session._id } , { $set : { "photoname" : photoName } }  ,function(error,result)
      {
        console.log(result);
        if(error)
          {
            console.log("error vale mai");
            throw error;
          }
        else
        {
          console.log("update vale mai");
        //   req.session.photoname = photoName;
        //  console.log(req.session);
        //   console.log(req.session.photoname);
          res.render('cCommPanel', { obj : req.session });
        }
      })
  }
})
});


   app.get('/cgroups',logger,function(req,res)
  {
	 
	  res.render('cCommPanel',{obj : req.session});

  });

   app.get('/cAddCommunity',logger,function(req,res)
  {
	 
	  res.render('cAddComm',{obj : req.session});

  });
  
     app.get('/cUserSearch',logger,function(req,res)
  {
	 
	  res.render('cSearch',{obj : req.session});

  });
  

  
  /*
  app.post('/createComm',function(req,res)
  {
	  console.log(req.body);
	   let newProduct = new com_instance({
    cName: req.body.cName,
	cRule: req.body.cRule,
	cLoc: "Chandigarh",
	cOwner : req.session.email,
	cDate : req.body.cDate,
	cStatus : "Active",
	cDesc : req.body.cDesc,
	cOwnerId : req.session._id
	
	
  })
  newProduct.save()
   .then(data => {
	   instance.updateOne(  { "_id" : req.session._id } , { $push : { owned : cid } } , function(err,result)
     console.log(data)
     res.send("Created")
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })
  });
  */
 
  app.post('/createComm',logger,function(req,res)
{
  console.log(req.body);
 // if(req.body.myImage)
  //{
    createcommunity(req)
  //}
  //else {
   // createcommunity(req)
  //}
 // res.render('switchcreatecommunity',{ obj : req.session.data });
 res.send("Created")
})

function createcommunity(req)
{
  var obj = req.body;
  console.log(obj);
//  var today = new Date()
 // var dd = today.getDate();
 // var mm = getMonths(today.getMonth());
  //var yyyy = today.getFullYear();
 // obj.communitycreatedate = dd + "-" + mm + "-" + yyyy
  obj.cOwner = req.session.email;
  obj.cOwnerId = req.session._id;
  obj.cLoc = "Not Added";
  obj.cStatus = "Active";
  com_instance.create(obj,function(err,result)
  {
      if(err)
      throw err;
      else {
        console.log("created SUCCESFULLY");
        //cid =  result._id ;
        instance.updateOne(  { "_id" : req.session._id } , { $push : { owned : result._id } } , function(err,result)
        {
          if(err)
          throw err;
          else {
            console.log(result);
          }
        })
      }
  })
}

function getMonths(monthno)
{
  var month=["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return month[monthno];
}
  
 //---pending update
 app.put('/pupdate',logger,function(req,res){
    console.log(req.body);
    instance.findOneAndUpdate(
    {
       email : req.session.email,
    }, 
    {
      name : req.body.name,
	  dob : req.body.dob,
	  phone : req.body.phone,
	  city : req.body.city,
	  gender: req.body.gender,
	  status: "Confirmed"
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })

    .then(data => {
        console.log(data)
			//req.session.isLogin = 1;
		//	req.session._id = data[0]._id;
		//	req.session.email=data[0].email;
		//	req.session.password = data[0].password;
			req.session.gender=req.body.gender;
			req.session.city=req.body.city;
			req.session.dob = req.body.dob;
			req.session.phone=req.body.phone;
		//	req.session.role = data[0].role;
			req.session.name = req.body.name;
		//	req.session.flag = data[0].flag;
			req.session.status = "Confirmed";
		//	req.session.photoname = data[0].photoname;
        res.send(req.session.role)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})
//-------------------------------------------------

app.get('/ownedCommunities',logger,function(req,res)
    {
        com_instance.find( { $or : [{ cOwnerId : req.session._id },{ joinedMembers : { $in : [req.session._id] } },{ requestedMembers : { $in : [req.session._id] } }] } ).exec(function(error,result) {
         {
            if(error)
            throw error;
            else {
              res.send(result);
            }
          }
        })
  })

app.post('/freeCommunities',logger,function(req,res)
    {
      let start = req.body.start;
      let end = req.body.end;
         com_instance.find( { $and : [{ cOwnerId : { $not : { $eq : req.session._id } } },{ joinedMembers : { $nin : [req.session._id] } },{ requestedMembers : { $nin : [req.session._id] } }] } ).skip(start).limit(end).exec(function(error,result) {
        {
          if(error)
          throw error;
          else {
            console.log(result);
            res.send(result);
          }
        }
    })
    })
	
app.post('/djoin',logger,function(req,res)
    {
      instance.updateOne( { "_id" : req.session._id } , { $push : { join : req.body._id } } , function(error,result)
      {
          if(error)
          throw error;
          else {
            com_instance.updateOne( { "_id" : req.body._id } , { $push : { joinedMembers : req.session._id } } , function(error,result)
            {
              if(error)
              throw error;
              else {
                console.log("hogyajbkbkjjkbkbkj");
                res.end();
              }
            })
          }
      })
    })

    app.post('/pjoin',logger,function(req,res)
    {
        instance.updateOne( { "_id" : req.session._id } , { $push : { request : req.body._id } } , function(error,result)
        {
            if(error)
            throw error;
            else {
              com_instance.updateOne( { "_id" : req.body._id } , { $push : { requestedMembers : req.session._id } } , function(error,result)
              {
                if(error)
                throw error;
                else {
                  console.log("hogyajbkbkjjkbkbkj");
                  res.end();
                }
              })
            }
        })
    })	
/*	
 app.get('/communityprofile/:pro',function(req,res){

    var aid = req.params.pro;
    com_instance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
            console.log(result);
            console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
            res.render('cCommProfile',{ objcomm : result , obj : req.session });
        }
    })

})
*/

app.get('/community/communityprofile/:pro',logger,function(req,res)
    {
        var id = req.params.pro;
        console.log(id);
        // req.session.data.communityid = id;
        // res.render('communityprofile',{ obj : req.session.data });
        com_instance.findOne( { "_id" : id } , function(error,result)
        {
            if(error)
            throw error;
            else {
              // console.log(result);
              // if(req.session.data.role == 'admin')
              // {
              //   // console.log("hye");
              //     res.render('switchcommunityprofile',{ obj: req.session.data, commobj: result });
              // }
            //  else {
                // console.log("h");
                console.log(result);
                  res.render('cCommProfile',{ obj: req.session, objcomm: result });
             // }
            }
        })
    })

    app.get('/ucommunity/communityprofile/:pro',logger,function(req,res)
    {
        var id = req.params.pro;
        console.log(id);
        // req.session.data.communityid = id;
        // res.render('communityprofile',{ obj : req.session.data });
        com_instance.findOne( { "_id" : id } , function(error,result)
        {
            if(error)
            throw error;
            else {
              // console.log(result);
              // if(req.session.data.role == 'admin')
              // {
              //   // console.log("hye");
              //     res.render('switchcommunityprofile',{ obj: req.session.data, commobj: result });
              // }
            //  else {
                // console.log("h");
                console.log(result);
                  res.render('uCommProfile',{ obj: req.session, objcomm: result });
             // }
            }
        })
    })

app.post('/cancelRequest',logger,function(req,res)
    {
        console.log("aagya");
        com_instance.update({ "_id" : req.body._id },{ $pull : { requestedMembers : { $in : [req.session._id]}}} ,function(error,result){
         if(error)
         throw error;
         else {
             instance.update({ "_id" : req.session._id },{ $pull : { request : { $in : [req.body._id] } } }, function(error,result){
               if(error)
               throw error;
               else {
                 res.send("jfkd");
               }
             })
           }
        })
        res.end();
    })

    app.get('/community/manageCommunity/:pro',logger,function(req,res)
    {
      var id=req.params.pro;
        com_instance.findOne( { "_id" : id },function(err,result)
        {
            if(err)
            throw err;
            else {
              res.render('buildermanageCommunity',{ obj : req.session, commobj : result });
            }
        })
        // res.render('buildermanageCommunity',{ obj : req.session.data });
    })

    app.get('/community/discussions/:pro',logger,function(req,res)
    {
        var id = req.params.pro;
        com_instance.findOne( { "_id" : id  },function(err,result)
        {
          if(err)
          throw err;
          else {
              res.render('builderdiscussions',{ obj : req.session, commobj : result });
          }
        })
    })

    app.post('/tl',logger,function(req,res)
    {
      // console.log(req);
      var count;

      if(req.body.order[0].column==0)
      {
        if(req.body.order[0].dir=="asc")
        getdata("tag",1);
        else
        getdata("tag",-1);
      }
      else if(req.body.order[0].column==1)
      {
        if(req.body.order[0].dir=="asc")
        getdata("creator",1);
        else
        getdata("creator",-1);
      }
      else if(req.body.order[0].column==2)
      {
        if(req.body.order[0].dir=="asc")
        getdata("createDate",1);
        else
        getdata("createDate",-1);
      }
      else {
        getdata("tag",1);
      }


      function getdata(colname,sortorder)
      {
          tag_instance.countDocuments(function(e,count){
            var start=parseInt(req.body.start);
            var len=parseInt(req.body.length);
            // var role=req.body.role;
            // var status=req.body.status;
            var search=req.body.search.value;
            var getcount=10;
            console.log(req.body.search.value.length);


          var findobj={};
            // console.log(role,status);
            // if(role!="all")
            //    { findobj.role=role;
            //    }
            // else{
            //     delete findobj["role"];
            // }
            // if(status!="all")
            //     {findobj.status=status;}
            // else{
            //     delete findobj["status"];
            // }
            if(search!='')
                findobj["$or"]= [{
                "tag":  { '$regex' : search, '$options' : 'i' }
            }, {
                "creator":{ '$regex' : search, '$options' : 'i' }
            },{
                "createDate": { '$regex' : search, '$options' : 'i' }
            }]
            else{
                delete findobj["$or"];
            }


           tag_instance.find(findobj).countDocuments(function(e,coun){
            getcount=coun;
          }).catch(err => {
            console.error(err)
            res.send(error)
          })

            tag_instance.find(findobj).skip(start).limit(len).sort({[colname] : sortorder})
            .then(data => {
                res.send({"recordsTotal" : count,"recordsFiltered" :getcount,data})
              })
              .catch(err => {
                console.error(err)
              //  res.send(error)
              })
          });
        }
    })
 
  app.listen(3000);