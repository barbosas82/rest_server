var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var AccessTokenSchema = new Schema({
    "_id" : Number,
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

AccessTokenSchema.plugin(autoIncrement.plugin, 'AccessTokenModel');

mongoose.model('AccessTokenModel', AccessTokenSchema);;
