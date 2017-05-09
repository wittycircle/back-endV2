/*	**************************************************************
				testing area
	************************************************************** */


const match_id = (o, r) => {
	r.forEach(e => {
		e.user_id = o[e.user_id]
	})
	return r;
};

const getLocation = (o, r) => {
	
}
module.exports.match = match_id;
// ------------------  ------------------


/*	**************************************************************
				bails de google pour la magie de location
				//plus tard?
	************************************************************** */
/*
const google_loc = (city) => {
	let bla = ""
	// let or = {
	// 	city,
	// 	state, "",
	// 	country, "",
	// 	latitude: "",
	// 	longitude: "",
	// };

	let API_KEY = "AIzaSyAz20i0p6h1gXdaQz4OgYEA-9GGdJ4hv_0"; 
	let url_path = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}` 
	https.get(url_path, res => {
		res.setEncoding('utf8') 
		res.on('data', d => bla += d)
		res.on('end', d => {
			bla = JSON.parse(bla)
			console.log(bla.results[0].address_components)
		})
	})
}
*/
