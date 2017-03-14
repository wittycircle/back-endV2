const {db, TABLES} = require('./index');

exports.getList = () => {
    return db.select('*').from(TABLES.SKILLS)
};
