var array = ["iOS Apps","Exercise","Entrepreneurship","Movies","Social Media","Self-Improvement","Productivity","Architecture","Humor","DIY","Education","Programming","Economics","Happiness","Interior Design","Earth Science","Emerging Technology","New Music","Philosophy","Mobile Technology","Fashion Trends","Relationships","Art","Astronomy","Amazing","Nature","Medicine","Home Improvement","Health Care","Home Decorating","Wearable Tech","Motivation","Literature","Psychology","Frugal Living","Digital Photography","Comedy","Gardening","Popular Fiction","The Brain","Personal Organizing","Management","Great Books","Writing","Business Planning","Investing","Spirituality","Energy","Leadership","Teaching","Religion","Yoga","Running","Pop Culture","iOS","Problem-solving","Law","iPhone Apps","Street Art","American History","Avant-garde","The Future","Corporate Finance","Weather","NASA","Anthropology","Love","Archaeology","Marketing","Journalism","Space","Infographics","Recipes","Cities","Body Image","Sleep","Animation","Urbanism","VR","Artificial Intelligence","Reading","Backpacking"]
	db(TABLES.INTERESTS)
	.whereNotIn('name', array)
	.del()
	.then( r => {
		db(TABLES.INTERESTS)
		.select('name')
		.then(r => {
			r = r.map(e => e.name);
			array = __.difference(array, r);
			let newArray = []
			array.forEach(n => {
				newArray.push({name: n, priority: 1});
			})
			db.batchInsert('interests', newArray);
		});
	})
