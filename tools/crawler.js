var request = require('request');
var cheerio = require('cheerio');
var jsonfile = require('jsonfile')
 
var file = './tmp/dataset.json'

var memes = {memes:[1,2,3,4]}
var memes2 = JSON.stringify(memes);


//var repeat = false;
var totalObject = {"dataset":[]};
var count = 1;

var writeJSON = function(){
	console.log(totalObject);
	console.log(totalObject.length);
	console.log(objNum);
	console.log('Writing to file...')
	jsonfile.writeFile(file, totalObject, function(err) {
		console.log(err);
	})
	

}

var objNum = 0;
var cow = 735;
var index = function(){
	if (cow == 0) {

		writeJSON();
	}
	if (cow > 0){
		request('https://www.antagning.se/se/searchajax?period=HT_2016&page='+cow, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
		    	var obj = {}

		    	$('li').each(function(i, element){
		    		var obj = {}
			    	li = $(this);
			    	//console.log($(this));
			    	var container = li.children('.expandingsearcharea').children('.namearea');
					obj.kod = container.children('.indentedmoreinfocontainer').children().first().children().first().children().first().children().first().children().eq(3).text().slice(15).trim();


			    	obj.namn = container.children('.moreinfolink').text();
			    	obj.hp = container.children('.moreinfolink').next().text();
			    	
			    	var info = container.children('.moreinfolink').next().next().text();
			    	var meme = info.trim().slice(20).split(",");

			    	obj.hogskola = meme[0];
			    	obj.ort = meme[1].slice(12);
			    	

			    	obj.period = container.children('.indentedmoreinfocontainer').children().first().children().first().children().first().children().first().children().first().text().slice(28);
			    	obj.niva = container.children('.indentedmoreinfocontainer').children().first().children().first().children().first().children().first().children().eq(1).text().slice(6);
			       	obj.sprak = container.children('.indentedmoreinfocontainer').children().first().children().first().children().first().children().first().children().eq(2).text().slice(27).trim();

			       	var meme = container.children('.indentedmoreinfocontainer').children().first().children().first().children().eq(1).children().first().children().eq(0).text().slice(24).trim().split('\n');
			       	obj.form = meme[0].slice(0, -1);
			       	obj.typ = meme[1].trim();

			       	if (obj.typ == 'Distans' && container.children('.indentedmoreinfocontainer').children().first().children().first().children().eq(1).children().first().children().eq(1).text().includes('träffar') == true) {
			       		obj.traffar = container.children('.indentedmoreinfocontainer').children().first().children().first().children().eq(1).children().first().children().eq(1).text().slice(15);
			       		obj.studietakt = container.children('.indentedmoreinfocontainer').children().first().children().first().children().eq(1).children().first().children().eq(2).text().slice(12).trim();
			       		obj.undervisningstid = container.children('.indentedmoreinfocontainer').children().first().children().first().children().eq(1).children().first().children().eq(3).text().slice(18);

			       	}else{
			       		obj.studietakt = container.children('.indentedmoreinfocontainer').children().first().children().first().children().eq(1).children().first().children().eq(1).text().slice(12).trim();
		       			obj.undervisningstid = container.children('.indentedmoreinfocontainer').children().first().children().first().children().eq(1).children().first().children().eq(2).text().slice(18);

			    	}
			    	if (container.children('.indentedmoreinfocontainer').children().first().children().eq(1).children().first().children().first().text().trim().slice(0,3).trim() != 'Läs') {

			       		var forkunskapskrav = container.children('.indentedmoreinfocontainer').children().first().children().eq(1).children().first().children().first().text().trim().slice(16).trim().split('\n');
			       		for (var i = forkunskapskrav.length - 1; i >= 0; i--) {
			       			forkunskapskrav[i] = forkunskapskrav[i].trim();
			       		}
			       		obj.forkunskapskrav = forkunskapskrav.join(' ');
			       	}else{
			       		if (container.children('.indentedmoreinfocontainer').children().first().children().eq(1).children().first().children().first().text().trim().includes('plats')) {
			       			obj.platser = container.children('.indentedmoreinfocontainer').children().first().children().eq(1).children().first().children().first().text().trim().slice(30);
			       		}
			       		obj.forkunskapskrav = container.children('.indentedmoreinfocontainer').children().first().children().eq(1).children().first().children().first().text().trim();
			       	}
			       	if (obj.studietakt.startsWith('Hel')) {obj.studietakt = '100%'
			       	}else if(obj.studietakt.startsWith('Halv')){obj.studietakt = '50%'
					}else if(obj.studietakt.startsWith('Kvart')){obj.studietakt = '25%'}
			       	var weww = {}
			       	weww[obj.kod] = obj;
			       	totalObject['dataset'].push(weww);
			       	console.log(obj.namn);
			       	objNum++;
			    	
			    	
			    });
				cow--;
				index();
			}
		});
	}
}
		

var wew = function(){
	index(index);
	
}

wew();