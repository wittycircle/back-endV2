'use strict';

const { db, TABLES } = require('../app/models/index'),
     p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('articles/'),
        tag_route = 'http://localhost:3000/api/article_tags/',
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            articles: require('./schemas/article.schema'),
            error: require('./schemas/error.schema')
        },
        test = {
        	article_id: null,
        	tag_id: null,
        };
// ------------------ Tests ------------------
describe('', function() {
    it ('should print something big', function() {
        console.log( "\x1b[35m" + " ------------------ Articles ------------------\n");
    })
});

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

		it('Should have modify db', function() {
		    let max_id = db(TABLES.ARTICLES).select(db.raw('MAX(id)'));
		    return db(TABLES.ARTICLES).select('id', 'title').where('id', max_id)
		    .then(r => {
		    	test.article_id = r[0].id;
		    	return expect(r[0].title).to.equal("Fake article");
		    });
		});
	});

	describe('Update article [PUT /articles:article_id]', function() {
		let r, v;
		const data = {
			title: "Updated fake",
			tags: [2, 3],
		}
		before('request', function() {
			r = chakram.put(route + test.article_id, data);
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
// ------------------ TAG ------------------
	describe('Add tag to article [POST /articles/:article_id/article_tags]', function() {
		let r, v;
		before('request', function() {
			r = chakram.post(route + test.article_id + "/article_tags", {tag: "popcorn"});
		});
	
		it('Should send success', function() {
			return expect(r).to.joi(schemas.common.id);
		});

		it('Should have modify db', function() {
		    let max_id = db(TABLES.TAG_ARTICLES).select(db.raw('MAX(id)'));
		    return db(TABLES.TAG_ARTICLES).select('article_id', 'tag_id').where('id', max_id)
		    .then(r => {
		        return expect(r[0].tag_id).to.equal(6)
		    });
		});
	});

	describe('Remove tag from article [DELETE /articles/:article_id/article_tags/:tags_id]', function() {
		let r, v;
		before('request', function() {
			r = chakram.delete(route + test.article_id + "/article_tags/" + 6);
		});
	
		it('Should send success', function() {
			return expect(r).to.joi(schemas.common.success);
		});
	});

// ------------------ Upvotes ------------------

	describe('Upvote article [POST /articles/:article_id/up]', function() {
		let r, v;
		before('request', function() {
			r = chakram.post(route + test.article_id + "/up");
		});
	
		it('Should send success', function() {
			return expect(r).to.joi(schemas.common.success);
		});

		it('Should have modify db', function() {
		    let max_id = db(TABLES.ARTICLE_LIKES).select(db.raw('MAX(id)'));
		    return db(TABLES.ARTICLE_LIKES).select('article_id').where('id', max_id)
		    .then(r => {
		        return expect(r[0].article_id).to.equal(test.article_id);
		    });
		});
	});

	describe('Get article upvotes [GET /articles/:article_id/up]', function() {
		let r, v;
		before('request', function() {
			r = chakram.get(route + 4 + "/up");
		});
	
		it('Should send the count', function() {
			return expect(r).to.joi(schemas.common.upvotes);
		});
	});

	describe('Un upvote article [DELETE /articles/:article_id/up]', function() {
		let r, v;
		before('request', function() {
			r = chakram.delete(route + test.article_id + '/up');
		});
	
		it('Should send success', function() {
			return expect(r).to.joi(schemas.common.success);
		});

		it('Should have modify db', function() {
		    let max_id = db(TABLES.ARTICLE_LIKES).select(db.raw('MAX(id)'));
		    return db(TABLES.ARTICLE_LIKES).select('article_id').where('id', max_id)
		    .then(r => {
		        return expect(r[0].article_id).to.not.equal(test.article_id);
		    });
		});
	});
			// *** Remove article ***
	// describe('remove article [DELETE /articles/:article_id]', function() {
	// 	let r, v;
	// 	before('request', function() {
	// 		r = chakram.delete(route + test.article_id);
	// 	});
	
	// 	it('Should match schema', function() {
	// 		return expect(r).to.joi(schemas.common.success);
	// 	});

	// 	after('Cleanup table articles', function () {
	// 		db.raw('DELETE from articles where id > 4').return();
	// 		db.raw('alter table articles AUTO_INCREMENT = 5').return();
	// 	});
	// });
// ------------------ ARTICLES TAGS ------------------
describe('', function() {
    it ('should print something big', function() {
        console.log( "\x1b[35m" + "			*** Article TAGS ***");
    })
});

	describe('Create article tag [POST /article_tags]', function() {
		let r, v;
		before('request', function() {
			r = chakram.post(tag_route, {tag: "inspiring"});
		});
	
		it('Should create tag', function() {
			 expect(r).to.joi(schemas.common.id);
			 r.then(rr => {
			 	test.tag_id = rr.body.id;
				 return db(TABLES.ARTICLE_TAGS).first('name').where({id: rr})
				 .then(rr => expect(rr.name).to.equal("inspiring"))
			 })
			return chakram.wait();
		});
	});

	describe('update article tag [PUT /article_tags/tags_id]', function() {
		let r, v;
		before('request', function() {
			r = chakram.put(tag_route + test.tag_id, {tag: {name: "Something inspiring"}});
		});
	
		it('Should update the tag', function() {
			return expect(r).to.joi(schemas.common.success);
		});
	});

	describe('Remove article tag [DELETE /article_tags/tags_id]', function() {
		let r, v;
		before('request', function() {
			r = chakram.delete(tag_route +  test.tag_id);
		});
	
		it('Should remove tag', function() {
			return expect(r).to.joi(schemas.common.success);
		});
	});

	describe('Get article tags [GET /article_tags]', function() {
		let r, v;
		before('request', function() {
			r = chakram.get(tag_route);
		});
	
		it('Should give a list of tags', function() {
			return expect(r).to.joi(schemas.articles.tag_list);
		});
	});
}; // ------------------ end module ------------------