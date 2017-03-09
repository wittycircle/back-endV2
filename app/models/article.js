const {db, TABLES} = require('./index'),
        _ = require('lodash'),
        h = require('./helper');


// ------------------ Local helpers ------------------

const getTagsFromArticleId = (data, id) => db.select('t.name', 'ta.id as tagged_id', 't.id')
					.from(TABLES.ARTICLE_TAGS + ' as t')
					.join(TABLES.TAG_ARTICLES + ' as ta', 'ta.tag_id', 't.id')
					.where('ta.article_id',  id)
					.then(r => {console.log("R IS", r)
						return [r, data]})

const removeOldTag = ([res, data]) => {
	const tomap = _.difference(res.map(e => e.id), data.tags)
	const fromdb = res.map(e => e.tagged_id)
	const toReturn = _.difference(data.tags, res.map(e => e.id))
	let toRemove = [];
	res.forEach(el => {
		tomap.forEach(r => {
			if (el.id == r)
				toRemove.push(el.tagged_id)
		})
	});
	if (toRemove.length) {
		return db(TABLES.TAG_ARTICLES).del().whereIn('id', toRemove)
				.then(r => toReturn)
	}
};

// ------------------ Main methods ------------------
exports.createArticle = (data) => {
	let x = [];
	const i_data = {
		title: data.title,
		text: data.text,
		read_time: (data.text.length / 400) + 1,
		author_id: data.uid
	}
	if (data.picture) i_data.picture = data.picture;

	return db(TABLES.ARTICLES).insert(i_data)
		.then(([id]) => {
			data.tags.forEach((el, i) => {
				x.push(db(TABLES.TAG_ARTICLES)
				.insert({
					article_id: id, 
					tag_id: el 
				}));
			}); 
			return Promise.all(x).then(() => id) 
		}); 
};

exports.getArticles = () => {
	const a_articles = ['a.id', 'author_id', 'a.creation_date',
			'picture', 'title', 'text',
			db.raw('IFNULL (views, 0) as views'),
			db.raw('IFNULL (read_time, 0) as read_time'),
			db.raw('GROUP_CONCAT(t.name) as tags')
			]
	return db.select(a_articles)
			.from(TABLES.ARTICLES + ' as a')
			.leftJoin(TABLES.TAG_ARTICLES + ' as ta', 'a.id', 'ta.article_id')
			.leftJoin(TABLES.ARTICLE_TAGS + ' as t', 't.id', 'ta.tag_id')
			.groupBy('a.id')
};

exports.removeArticle = (id, uid) => {
	return h.admin(TABLES.ARTICLES, id, uid).then(r => {
		if (!r.length){
			return "Bad article id or bad rights [Not an admin]"
		} else{
			return db.del().from(TABLES.ARTICLES).where({id: id})
		}
	});
};

exports.updateArticle = (data, id) => {
	let x = [];
	const i_data = {};
	if (data.title) i_data.title = data.title;
	if (data.text) i_data.text = data.text;
	if (data.picture) i_data.picture = data.picture;

	return h.admin(TABLES.ARTICLES, id, data.uid).then(([r, r1]) => {
		if (!r.length || !r1.length || !data.tags)
			return "Not an admin"
		else {
			return db(TABLES.ARTICLES).update(i_data).where('id', id) 
				.then(() => getTagsFromArticleId(data, id))
				.then(removeOldTag)
				.then((res) => {
					res.forEach((el, i) => {
						x.push(db(TABLES.TAG_ARTICLES)
							.insert({article_id: id, tag_id: el}).return())
					}); 
					return Promise.all(x).then(() => ["Finished"])
				});
			}
	});
};
