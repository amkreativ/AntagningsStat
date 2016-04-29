var jsonfile = require('jsonfile');
var mongoose = require('mongoose');

var user = process.env.MONGO_USER;
var password = process.env.MONGO_PASSWORD;

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

		var recentRepeat = 0;
		var loops = 0;
		var prevObject = {};
		for (var i = ht16.length - 1; i >= 0; i--) {
			var kod = ht16[i].kod;
			obj[kod] = {
				namn_ht16: ht16[i].namn,
				sokande_total_ht16: ht16[i].sokande_total,
				kod_ht16: ht16[i].kod



			};
			if (prevObject.namn_ht16 == obj[kod].namn_ht16) {
				// Objektet liknar det förra objektet i listan.

				//console.log(prevObject.namn_ht16 + " = " + obj[kod].namn_ht16);
				recentRepeat++;
				console.log(recentRepeat + ' DUBBEL: ' + prevObject.namn_ht16);
				




			}else{
				// Objektet liknar inte det förra objektet i listan.

				//console.log(prevObject.namn_ht16 + " != " + obj[kod].namn_ht16);

				recentRepeat = 0;



			}

			

			for (var j = ht15.length - 1; j >= 0; j--) {
				if (ht16[i].namn == ht15[j].namn && ht16[i].hogskola == ht15[j].hogskola) {
					if (loops > 0) {
						//console.log('loop: ' + loops + ' repeat' + recentRepeat);
					}
					/*
					if (recentRepeat == loops) {
						obj[kod].namn_ht15 = ht15[j].namn;
						obj[kod].sokande_total_ht15 = ht15[j].sokande_total;
						obj[kod].kod_ht15 = ht15[j].kod;

						loops = 0;
						//console.log("MOOP");

					}
					*/


					count++;
					//console.log("Break!");
					//break;

					if (recentRepeat >= loops && loops != 0) {
						console.log(loops + ' ' + recentRepeat);
						loops = 0;
						obj[kod].namn_ht15 = ht15[j].namn;
						obj[kod].sokande_total_ht15 = ht15[j].sokande_total;
						obj[kod].kod_ht15 = ht15[j].kod;
						console.log(recentRepeat + " " + loops);
						break;

						
					}
					//console.log("MEME");
				}
				
				
			}
			if (recentRepeat > 0) {
				loops++;
			}
			

			prevObject = obj[kod];

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
    console.log(user + " " + password);
    console.log(__dirname + '/.env');
};