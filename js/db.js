var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

//schemas
var userSchema  = new Schema({
  name: String,
  age: String
});

//models
var userModel = mongoose.model('users', userSchema);

//function to init db
var connectDb = function(){
  //mongoose.connect('mongodb://127.0.0.1/skillsquared');
  mongoose.connect('mongodb://user:flying_fox_99@ds111559.mlab.com:11559/meanapp');
  var db = mongoose.connection;
  db.once('open', function(){
    console.log('Database connected');
  });
  db.on('error', function(err){
    console.log('Error',err);
  });
}

// functions
var addUser = function(userDetails, callback){
  var newUser = new userModel(userDetails);
  newUser.save(function(err,data){
    if(err) {
      callback(err);
    }else{
      callback(null, data);
    }
  });
}

var listUsers = function(callback){
  userModel.find({},function(err,data){
    if(err) {
      callback(err);
    }else{
      callback(null, data);
    }
  });
}

var deleteUser = function(userDetails, callback){
  userModel.remove({_id:userDetails },function(err,data){
    if(err) {
      callback(err);
    }else{
      callback(null, data);
    }
  });
}

//export
module.exports.connectDb = connectDb;
module.exports.addUser   = addUser;
module.exports.listUsers = listUsers;
module.exports.deleteUser = deleteUser;
