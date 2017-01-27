var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    crypto = require('crypto');

// User
var UserSchema = new Schema({
    "_id" : Number,
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

UserSchema.plugin(autoIncrement.plugin, 'UserModel');

UserSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure – return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

UserSchema.virtual('userId')
    .get(function () {
        return this.id;
    });

UserSchema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('hex');
        //more secure - this.salt = crypto.randomBytes(128).toString('hex');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


UserSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

mongoose.model('UserModel', UserSchema);
