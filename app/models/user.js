var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	username: {type: String, required: true, index:{unique:true}},
	password: {type: String, required: true, select:false}, //select:false para que não traga o password no select
});

//HASH password
UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);
		console.log(hash);
		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function(password){
	var user = this;
	console.log(password);
	console.log(user.password);
	return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);