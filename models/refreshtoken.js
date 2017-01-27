var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var RefreshTokenSchema = new Schema({
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

RefreshTokenSchema.plugin(autoIncrement.plugin, 'RefreshTokenModel');

mongoose.model('RefreshTokenModel', RefreshTokenSchema);
