/*	**************************************************************
				testing area
	************************************************************** */
https = require('https');

module.exports.match_id = (o, r) => {
	r.forEach(e => {
		e.user_id = o[e.user_id]
	})
	return r;
};

/*	**************************************************************
				bails de google pour la magie de location
				//plus tard?
	************************************************************** */

module.exports.google_loc = (city) => {
	return new Promise((resolve, reject) => {
	let bla = ''
	let API_KEY = "AIzaSyAz20i0p6h1gXdaQz4OgYEA-9GGdJ4hv_0"; 
	let url_path = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}` 
	https.get(url_path, res => {
		res.setEncoding('utf8') 
		res.on('data', d => bla += d)
		res.on('end', d => {
			let results = JSON.parse(bla).results[0];
			if (!results)
				reject({city: "unknown", state: "unknown", "country": "unknown"})
			else {
			let fa = results.formatted_address.split(',');
			let geo = results.geometry.location;
			let ret = {
				city: fa[0],
				state: "",
				country: fa[1],
				lng: geo.lng,
				lat: geo.lat,
			};
			if (fa.length === 3){
				ret.state = fa[1] ;
				ret.country = fa[2]; 
			}
			console.log(city, ret)
			resolve(ret);
				
			}
		})
	});
	});
}
