exports.alla = function(req, res) {
    res.send('Hello World!');
};

exports.visa = function(req, res) {
	console.log(req.params.id);
    res.send(req.params.id);
};