'use strict';

const express = require('express'),
    router = express.Router(),
    article = require('../controllers/article'),
    search = require('../controllers/search'),
    {validate, validateParam, schemas} = require('../middlewares/validation'),
    {auth, AUTH} = require('../services/auth');
    
router.route('/articles')
	.post(auth(AUTH.PRIVATE), article.createArticle)//AA
    .get(auth(AUTH.PUBLIC), article.getArticles)

//			***	PARAMS	***
router.param('article_id', validateParam(schemas.params.id))
router.param('tags_id', validateParam(schemas.params.id))
//			***	PARAMS	***

router.route('/articles/:article_id')
	.delete(auth(AUTH.PRIVATE), article.removeArticle)//AA
	.put(auth(AUTH.PRIVATE), article.updateArticle)//AA


router.route('/articles/:article_id/article_tags')
    .post(auth(AUTH.PRIVATE), article.addTagArticle);

// ------------------ Upvotes ------------------

router.route('/articles/:article_id/up')
    .get(article.getArticleUpvotes)
    .post(auth(AUTH.PRIVATE), article.upvoteArticle)
    .delete(auth(AUTH.PRIVATE), article.unUpvoteArticle);

router.route('/articles/:article_id/article_tags/:tags_id')
    .delete(auth(AUTH.PRIVATE), article.removeTagArticle);

// ------------------ COMMENTS ------------------

router.route('/articles/comment/:id')
    .get(article.getComments)
    .post(auth(AUTH.PRIVATE), article.postComment)
    .delete(auth(AUTH.PRIVATE), article.removeComment)

// // ------------------ ARTICLES TAGS ------------------

router.route('/article_tags')
	.get(article.getTags)
	.post(auth(AUTH.PRIVATE), article.createArticleTag)//AA

router.route('/article_tags/:tags_id')
	.put(auth(AUTH.PRIVATE), article.updateTags)
    .delete(auth(AUTH.PRIVATE), article.removeTags)

module.exports = router