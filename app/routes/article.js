'use strict';

const express = require('express'),
    router = express.Router(),
    article = require('../controllers/article'),
    search = require('../controllers/search'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    passport = require('passport'),
    auth = (x) => passport.authenticate(x);

router.route('/articles')
	.post(auth('bearer'), article.createArticle)//AA
	.get(article.getArticles)

//			***	PARAMS	***
router.param('article_id', validateParam(schemas.params.id))
router.param('tags_id', validateParam(schemas.params.id))
//			***	PARAMS	***

router.route('/articles/:article_id')
	.delete(auth('bearer'), article.removeArticle)//AA
	.put(auth('bearer'), article.updateArticle)//AA


// // ------------------ ARTICLES TAGS ------------------

// router.route('/articles_tags')
// 	.get(article.getTags)
// 	.post(article.createTags)//AA

// router.route('/articles_tags/:tags_id')
// 	.delete(article.removeTags)
// 	.update(article.updateTags)

module.exports = router