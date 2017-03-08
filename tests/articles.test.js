'use strict';
module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('articles/'),
        rnd_string = Math.random().toString(36).slice(-10),
        ART_ID = 5,
        schemas = {
            common: require('./schemas/common.schema'),
            articles: require('./schemas/article.schema'),
            error: require('./schemas/error.schema')
        };
// ------------------ Tests ------------------

	describe('Create article [POST /articles]', function() {
		let r, v;
		const data = {
			title: "Fake article",
			text: "Fake news inside the article",
			tags: [2, 4]
		};
		before('request', function() {
			r = chakram.post(route, data);
		});
	
		it('Should match schema', function() {
			return expect(r).to.joi(schemas.common.success);
		});
	});

	describe('Update article', function() {
		let r, v;
		const data = {
			title: "Updated fake",
			tags: [2, 5],
			article_id: 5
		}
		before('request', function() {
			r = chakram.put(route + ART_ID, data);
		});
	
		it('Should match schema', function() {
			return expect(r).to.joi(schemas.common.success);
		});
	});
}; // ------------------ end module ------------------