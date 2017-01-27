var mongoose = require('mongoose'),
    Client = mongoose.model('ClientModel');




exports.add = function(req, res){
  var clientId = req.body.name;

  Client.findOne({"clientid": clientId}, function(err, exists){
      if (exists){
        return res.send("Client " + clientId + " already exists.");
      }else{
        Client.create(req.body, function (err, clt) {
                if (err) return console.log(err);
                return res.send("Client " + clientId + " created with id " + clt._id + ".");
        });
      }
  });
};
