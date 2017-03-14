const {db, TABLES} = require('./index'),
    _ = require('lodash'),
    h = require('./helper');

exports.updateOpening = (id, data) => {
    return h.exist(TABLES.PROJECT_OPENINGS, id).then(r => {
        if (!r.length) {
            return "Could not update opening"
        } else {
            return db(TABLES.PROJECT_OPENINGS)
                .update(data)
                .where('id', id)
        }
    })
};

exports.deleteOpening = (id) => {
    return h.exist(TABLES.PROJECT_OPENINGS, id).then(r => {
        if (!r.length) {
            return "Could not update opening"
        } else {
            return db(TABLES.PROJECT_OPENINGS).del().where('id', id);
        }
    })
};
