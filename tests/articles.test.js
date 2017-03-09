'use strict';

const { db, TABLES } = require('../app/models/index'),
     p_empty = ['', null];

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

	describe('Update article [PUT /articles:article_id]', function() {
		let r, v;
		const data = {
			title: "Updated fake",
			tags: [2, 5],
		}
		before('request', function() {
			r = chakram.put(route + ART_ID, data);
		});
	
		it('Should match schema', function() {
			return expect(r).to.joi(schemas.common.success);
		});
	});

	describe('Get Articles list [GET /articles]', function() {
		let r, v;
		before('request', function() {
			r = chakram.get(route);
		});
	
		it('Should match schema', function() {
			return expect(r).to.joi(schemas.articles.list);
		});
	});

	describe('remove article [DELETE /articles/:article_id]', function() {
		let r, v;
		before('request', function() {
			r = chakram.delete(route + ART_ID);
		});
	
		it('Should match schema', function() {
			return expect(r).to.joi(schemas.common.success);
		});

		after('Cleanup table articles', function () {
			db.raw('DELETE from articles where id > 4').return();
			db.raw('alter table articles AUTO_INCREMENT = 5').return();
		});
	});
}; // ------------------ end module ------------------