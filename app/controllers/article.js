const articles = require('../models/article'),
    _ = require('lodash');

// ------------------ Main methods ------------------


exports.createArticle = (req, res, next) => {
    req.body.uid = req.user.id;
    articles.createArticle(req.body)
        .then(r => {
            if (r > 0) {
                res.send({success: true})
            } else {
                return next([r, 'Could not create article'])
            }
        }).catch(err => next(err))
};

exports.getArticles = (req, res, next) => {
    articles.getArticles()
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Could not find any article'])
            }
            else {
                res.send({articles: r})
            }
        })
        .catch(err => next(err))
};

exports.removeArticle = (req, res, next) => {
    articles.removeArticle(req.params.article_id, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad article id'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};


exports.updateArticle = (req, res, next) => {
    req.body.uid = req.user.id;
    articles.updateArticle(req.body, req.params.article_id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};

// ------------------ Tag ------------------
exports.addTagArticle = (req, res, next) => {
    articles.addTagArticle(req.params.article_id, req.body.tag, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'tag format : [string || id]'])
            }
            else {
                res.send({id: r[0]})
            }
        })
        .catch(err => next(err))
};

exports.removeTagArticle = (req, res, next) => {
    articles.removeTagArticle(req.params.article_id, req.params.tags_id, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                console.log("TROUBL", r);
                return next([r, 'Could not remove'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};

// ------------------ Upvotes ------------------

exports.upvoteArticle = (req, res, next) => {
    articles.upvoteArticle(req.params.article_id, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Not found'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};

exports.unUpvoteArticle = (req, res, next) => {
    articles.unUpvoteArticle(req.params.article_id, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Not found'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};

exports.getArticleUpvotes = (req, res, next) => {
    articles.getArticleUpvotes(req.params.article_id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({upvotes: {who: r, count: r.length}});
            }
        })
        .catch(err => next(err))
};
// ------------------ Articles tags ------------------

exports.createArticleTag = (req, res, next) => {
    articles.createArticleTag(req.body.tag, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({id: r[0]})
            }
        })
        .catch(err => next(err))
};

exports.removeTags = (req, res, next) => {
    articles.removeTags(req.params.tags_id, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};

exports.getTags = (req, res, next) => {
    articles.getTags()
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown error'])
            }
            else {
                res.send({tags: r})
            }
        })
        .catch(err => next(err))
};

exports.updateTags = (req, res, next) => {
    articles.updateTags(req.params.tags_id, req.body.tag.name, req.user.id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Bad id'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};
