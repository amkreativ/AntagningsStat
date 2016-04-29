var request = require('request');
var cheerio = require('cheerio');
var jsonfile = require('jsonfile');
var _ = require('lodash');


// Path to main dataset
var file = './data/dataset.json';

var ht_15_path = './data/ht_15.json';
var ht_16_path = './data/ht_16.json';

var dataset = {};

var ht_15 = {};
var ht_16 = {};

var init = function(){
	console.log("Importing data...")
	jsonfile.readFile(file, function(err, obj) {
		//console.dir(obj);
		dataset = obj.dataset;
		console.log("\nDataset imported from: " + file + "\n\nObjects in main dataset: " + dataset.length);
		// Hämta HT15
		jsonfile.readFile(ht_15_path, function(err, obj) {
			ht_15 = obj;
			console.log("Dataset imported from: " + ht_15_path + "Objects in HT_15 dataset: " + ht_15.length);
			// Hämta HT16
			jsonfile.readFile(ht_16_path, function(err, obj) {
				ht_16 = obj;
				console.log("Dataset imported from: " + ht_16_path + "Objects in HT_16 dataset: " + ht_16.length);
			});
		});
		merge();
	});
};

var merge = function(){

};

init();