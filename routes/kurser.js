var jsonfile = require('jsonfile');
var mongoose = require('mongoose');

var user = 'DZ7VmVw3XdwuLGtB';
var password = 'RpQH3z2qA1bqN2fz';

var ht15_path = './data/ht_15.json';
var ht16_path = './data/ht_16.json';

var ht15 = jsonfile.readFileSync(ht15_path);
var ht16 = jsonfile.readFileSync(ht16_path);



mongoose.connect('mongodb://' + user + ':' + password + '@ds055865.mlab.com:55865/heroku_0g77z34j');

var Kurs = mongoose.model('Kurs', {
	kod: String,
	typ: String,
	namn: String,
	hogskola: String,
	terminer:[String],
	tillfallen: [{
		termin: String,
		sokande_total: Number,
		sokande_1a: Number,
		kvinnor_total: Number,
		kvinnor_1a: Number,
		man_total: Number,
		man_1a: Number,
		grupp_1_total: Number,
		grupp_1_1a: Number,
		grupp_2_total: Number,
		grupp_2_1a: Number,
		grupp_3_total: Number,
		grupp_3_1a: Number,
		svpn_total: Number,
		svpn_1a: Number,
		utan_svpn_total: Number,
		utan_svpn_1a: Number
	}]
});

createData = function(){
	Kurs.remove({},function(){
		console.log("DB CLEARED");
		var count = 0;
		var obj = {

		};
		for (var i = ht15.length - 1; i >= 0; i--) {
			var kod = ht15[i].kod;
			obj[kod] = {
				ht15: ht15[i].sokande_total
			}

		}
		for (var i = ht16.length - 1; i >= 0; i--) {
			var kod = ht16[i].kod;
			if (obj[kod] !== null) {
				console.log(kod);
				console.log(obj[kod]);
				obj[kod].ht16 = ht16[i].sokande_total
				console.log("AAAA");
				count++;
			}
		}
		console.log(obj);
		console.log(count);


	});
};



mongoose.connection.on('connected', function () {  
  console.log('Mongoose connection successful');
}); 


var meme = "AAAA";

exports.alla = function(req, res) {
    res.send(meme);
};

exports.visa = function(req, res) {
	console.log(req.params.id);
    res.send(req.params.id);
};

exports.skapa = function(req, res) {
	createData();
    res.send("meme");
};