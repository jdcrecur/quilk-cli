let mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
let userSchema = mongoose.Schema({
	userSetPrivateData : {
		email	 	: String
	},
	hash : 	{
		passwordReset: {
			expires : Date,
			hash    : String
		},
		emailReset: {
			expires : Date,
			hash    : String,
			email   : String
		}
	},
	local : {
		email        : String,
		password     : String,
		authenticated: Boolean
	},
	facebook : {
		id           : String,
		token        : String,
		email        : String,
		name		 : String,
		familyName	 : String,
		givenName	 : String,
		middleName	 : String,
		gender		 : String,
        photos       : Array,
		profileUrl   : String,
		emails		 : Array,
		updated_time : String,
		verified	 : Boolean
	},
	google : {
        data          : String,
		id            : String,
		token         : String,
		email         : String,
		verified_email: Boolean,
		picture		  : String,
		link		  : String,
		locale		  : String,
		name		  : String,
		family_name	  : String,
		given_name	  : String
	}
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = (password) => {
    try{
        return bcrypt.compareSync(password, this.local.password);
    } catch ( e ){
        return false;
    }
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
