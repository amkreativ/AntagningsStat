var request = require('request');
var cheerio = require('cheerio');
var jsonfile = require('jsonfile');
var _ = require('lodash');


// Path to main dataset
var file = './data/dataset2.json';

var writePath = './data/ht_16_combined.json';

var ht_15_path = './data/ht_15.json';
var ht_16_path = './data/ht_16.json';

var dataset = {};

var ht_15 = {};
var ht_16 = {};

var writeJSON = function(){
	console.log('Writing to file...')
	jsonfile.writeFile(writePath, newObject, function(err) {
		console.log(err);
	})
	

}

var init = function(){
	console.log("\nImporting data...")
	jsonfile.readFile(file, function(err, obj) {
		//console.dir(obj);
		dataset = obj;
		console.log("Import: " + file + "\tObjects in main dataset:\t" + dataset.dataset.length);
		// Hämta HT15
		jsonfile.readFile(ht_15_path, function(err, obj) {
			ht_15 = obj;
			console.log("Import: " + ht_15_path + "\tObjects in HT_15 dataset:\t" + ht_15.length);
			// Hämta HT16
			jsonfile.readFile(ht_16_path, function(err, obj) {
				ht_16 = obj;
				console.log("Import: " + ht_16_path + "\tObjects in HT_16 dataset:\t" + ht_16.length);
				merge();
			});
		});
	});
};

var counter = 0;

var newObject = {dataset:[]}

var merge = function(){
	console.log("\nData clustering sequence...");
	for (var i = dataset.dataset.length - 1; i >= 0; i--) {
		//console.log(dataset.dataset[i].kod);
		var kurs = dataset.dataset[i];

		//if (_.has(ht_16, kurs)) {}

		var meme3 = _.findIndex(ht_16, ['kod', kurs.kod]);
		//console.log(meme3);
		//console.log(ht_16[meme3].kod + ' ' + kurs.kod);

		// Match in datasets
		if (_.findIndex(ht_16, ['kod', kurs.kod]) != null && meme3 != -1) {
			counter++;
			var ht16 = ht_16[meme3];
			//console.log(kurs.kod + '\t' + ht16.sokande_total + '\t' + kurs.namn);
			var merged = _.merge(ht16,kurs);
			console.log(merged);
			newObject['dataset'].push(merged);
		}else{
			//console.log(kurs.kod);
		}

	}
	writeJSON();
	console.log(counter);
};

init();