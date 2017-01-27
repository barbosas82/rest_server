var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var ClientSchema = new Schema({
    "_id" : Number,
    name: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
} , {timestamps: true});

ClientSchema.plugin(autoIncrement.plugin, 'ClientModel');

mongoose.model('ClientModel', ClientSchema);
