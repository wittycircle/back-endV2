const { db, TABLES } = require('./index'),
  _ = require('lodash'),
  h = require('./helper');

// ------------------ Local helpers ------------------

const getTagsFromArticleId = (data, id) =>
  db
    .select('t.name', 'ta.id as tagged_id', 't.id')
    .from(TABLES.ARTICLE_TAGS + ' as t')
    .join(TABLES.TAG_ARTICLES + ' as ta', 'ta.tag_id', 't.id')
    .where('ta.article_id', id)
    .then(r => [r, data]);

const removeOldTag = ([res, data]) => {
  const tomap = _.difference(res.map(e => e.id), data.tags);
  const fromdb = res.map(e => e.tagged_id);
  const toReturn = _.difference(data.tags, res.map(e => e.id));
  let toRemove = [];
  res.forEach(el => {
    tomap.forEach(r => {
      if (el.id == r) toRemove.push(el.tagged_id);
    });
  });
  if (toRemove.length) {
    return db(TABLES.TAG_ARTICLES)
      .del()
      .whereIn('id', toRemove)
      .then(r => toReturn);
  }
};

// ------------------ Main methods ------------------

exports.createArticle = data => {
  let x = [];
  let y = {};
  const i_data = {
    title: data.title,
    text: data.text,
    read_time: data.text.length / 400 + 1,
    author_id: data.uid
  };
  if (data.picture) i_data.picture = data.picture;

  return db(TABLES.ARTICLE_TAGS).distinct('name', 'id').then(tags => {
    tags.forEach(el => {
      y[el.name] = el.id;
    });
    return db(TABLES.ARTICLES).insert(i_data).then(([id]) => {
      data.tags.forEach((el, i) => {
        console.log(y[el]);
        x.push(
          db(TABLES.TAG_ARTICLES).insert({
            article_id: id,
            tag_id: y[el]
          })
        );
      });
      return Promise.all(x).then(() => id);
    });
  });
};

exports.getArticles = (uid, id) => {
  const a_articles = [
    'a.id',
    'a.user_id',
    h.fullname,
    'p.picture as profile_picture',
    'a.creation_date',
    'a.picture',
    'title',
    'text',
    db.raw('IFNULL (views, 0) as views'),
    db.raw('IFNULL (read_time, 0) as read_time'),
    db.raw('GROUP_CONCAT(DISTINCT t.name) as tags')
  ];
  if (uid) {
    a_articles.push(
      db.raw('IF(l.user_id = ' + uid + ', true, false)  as hasLiked')
    );
  }

  let query = db
    .select(a_articles)
    .countDistinct('l.id as likes')
    .countDistinct('msg.id as messages')
    .from(TABLES.ARTICLES + ' as a')
    .leftJoin(TABLES.TAG_ARTICLES + ' as ta', 'a.id', 'ta.article_id')
    .leftJoin(TABLES.ARTICLE_TAGS + ' as t', 't.id', 'ta.tag_id')
    .leftJoin(TABLES.ARTICLE_LIKES + ' as l', 'l.article_id', 'a.id')
    .leftJoin(TABLES.ARTICLE_MSG + ' as msg', 'msg.article_id', 'a.id')
    .leftJoin(h.sub_profile, 'p.uid', 'a.user_id')
    .groupBy('a.id')
    .orderByRaw('a.creation_date DESC');

  if (id) query.where('a.id', id);
  return query;
};

exports.removeArticle = (id, uid) => {
  return h.admin(TABLES.ARTICLES, id, uid).then(r => {
    if (!r.length) {
      return 'Bad article id or bad rights [Not an admin]';
    } else {
      return db.del().from(TABLES.ARTICLES).where({ id: id });
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
    if (!r.length || !r1.length || !data.tags) return 'Not an admin';
    else {
      return db(TABLES.ARTICLES)
        .update(i_data)
        .where('id', id)
        .then(() => getTagsFromArticleId(data, id))
        .then(removeOldTag)
        .then(res => {
          res.forEach((el, i) => {
            x.push(
              db(TABLES.TAG_ARTICLES)
                .insert({ article_id: id, tag_id: el })
                .return()
            );
          });
          return Promise.all(x).then(() => ['Finished']);
        });
    }
  });
};
// ------------------ Tag ------------------
exports.addTagArticle = (article_id, tag, uid) => {
  const insert = t_id => {
    return h.exist(TABLES.ARTICLE_TAGS, t_id).then(r => {
      if (!r.length) return 'Bad tag id';
      else {
        return db(TABLES.TAG_ARTICLES).insert({
          article_id: article_id,
          tag_id: t_id
        });
      }
    });
  };

  return h.admin(TABLES.ARTICLES, article_id, uid).then(([r, r1]) => {
    if (!r.length || !r1.length) return 'Bad article id';
    else {
      if (typeof tag == 'string') {
        return db(TABLES.ARTICLE_TAGS)
          .first('id')
          .where('name', tag)
          .then(t => insert(t.id));
      } else {
        return insert(tag);
      }
    }
  });
};

exports.removeTagArticle = (article_id, tag_id, uid) => {
  return h.admin(TABLES.ARTICLES, article_id, uid).then(([r, r1]) => {
    if (!r.length || !r1.length)
      return 'Invalid: ' + !r.length ? 'article id' : 'not an admin';
    else {
      return db(TABLES.TAG_ARTICLES).del().where({ article_id, tag_id });
    }
  });
};

// ------------------ Upvotes ------------------

exports.upvoteArticle = (article_id, user_id) => {
  return h.exist(TABLES.ARTICLES, article_id).then(r => {
    if (!r.length) return 'Bad article id';
    else {
      return db(TABLES.ARTICLE_LIKES)
        .first('id')
        .where({ article_id, user_id })
        .then(r => {
          if (r)
            return db(TABLES.ARTICLE_LIKES).del().where({ article_id, user_id });
          else {
            return db(TABLES.ARTICLE_LIKES).insert({ article_id, user_id });
          }
        });
    }
  });
};
//unsued since post does everything -_-
exports.unUpvoteArticle = (article_id, user_id) => {
  return db(TABLES.ARTICLE_LIKES)
    .first('id')
    .where({ article_id, user_id })
    .then(r => {
      if (!r) return 'No upvote exist for this article id';
      else {
        return db(TABLES.ARTICLE_LIKES).del().where({ article_id, user_id });
      }
    });
};

exports.getArticleUpvotes = article_id => {
  return db(TABLES.ARTICLE_LIKES + ' as l')
    .join(h.u_profile, 'p.uid', 'l.user_id')
    .distinct(h.p_array)
    .where({ article_id });
};

// ------------------ Articles Tags ------------------

exports.createArticleTag = (name, uid) => {
  return db(TABLES.USERS)
    .select('id')
    .where({ id: uid, moderator: 1 })
    .then(r => {
      if (!r.length) {
        return 'Need to be an administrator';
      } else {
        return db(TABLES.ARTICLE_TAGS).first('id').where({ name }).then(r => {
          if (!r) return db(TABLES.ARTICLE_TAGS).insert({ name });
          else return 'Already exist';
        });
      }
    });
};

exports.removeTags = (id, uid) => {
  return h.admin(TABLES.ARTICLE_TAGS, id, uid).then(([r, r1]) => {
    if (!r.length || !r1.length) {
      return !r.length ? 'Bad article id' : 'Not an admin';
    } else {
      return db(TABLES.ARTICLE_TAGS).del().where({ id });
    }
  });
};

exports.getTags = () => {
  return db(TABLES.ARTICLE_TAGS).select(['id', 'name', 'creation_date']);
};

exports.updateTags = (id, name, uid) => {
  return h.admin(TABLES.ARTICLE_TAGS, id, uid).then(([r, r1]) => {
    if (!r.length || !r1.length) {
      return !r.length ? 'Bad article id' : 'Not an admin';
    } else {
      return db(TABLES.ARTICLE_TAGS).first('id').where({ name }).then(r => {
        if (!r) {
          return db(TABLES.ARTICLE_TAGS).update({ name }).where({ id });
        } else {
          return 'Already exist';
        }
      });
    }
  });
};

exports.getComments = id => {
  let selection = [
    'article_id',
    'uid',
    'message',
    'm.creation_date',
    'p.username',
    'p.picture'
  ];
  return db(TABLES.ARTICLE_MSG + ' as m')
    .distinct(selection)
    .where('article_id', id)
    .join(h.sub_profile, 'p.uid', 'm.user_id');
};

exports.postComment = data => {
  return h.exist(TABLES.ARTICLES, data.id).then(r => {
    if (!r.length) return 'Article not found';
    return db(TABLES.ARTICLE_MSG).insert(data);
  });
};

exports.removeComment = id => {
  return h.exist(TABLES.ARTICLE_MSG, id).then(r => {
    if (!r.length) return 'Comment not found';
  });
  return db(TABLES.ARTICLE_MSG).del().where('id', id);
};
