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


router.route('/articles/:article_id/article_tags')
    .post(auth('bearer'), article.addTagArticle);

// ------------------ Upvotes ------------------

router.route('/articles/:article_id/up')
    .get(article.getArticleUpvotes)
    .post(auth('bearer'), article.upvoteArticle)
    .delete(auth('bearer'), article.unUpvoteArticle);

router.route('/articles/:article_id/article_tags/:tags_id')
    .delete(auth('bearer'), article.removeTagArticle);
// // ------------------ ARTICLES TAGS ------------------

router.route('/article_tags')
	.get(article.getTags)
	.post(auth('bearer'), article.createArticleTag)//AA

router.route('/article_tags/:tags_id')
	.put(auth('bearer'), article.updateTags)
    .delete(auth('bearer'), article.removeTags)

module.exports = router