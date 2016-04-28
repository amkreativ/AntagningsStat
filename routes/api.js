exports.findAll = function(req, res) {
    res.send('Hello World!');
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};