const {db, TABLES} = require('./index');

const h = {
    p_array :['p.id', 'p.first_name', 'p.last_name', 'p.profile_picture', 'p.about', 'p.cover_picture', 'p.description'],
}
//prototype
h.up_array = h.p_array.concat('u.id as uid')
h.sub_user = db.select('id', 'profile_id').from(TABLES.USERS).as('u')
h.sub_profile = db.select(h.p_array).from(TABLES.USER_PROFILES + ' as p').as('p')
h.u_profile = db.select(h.up_array).from(h.sub_profile).join(h.sub_user, 'u.profile_id', 'p.id').groupBy('p.id').as('p')

module.exports = h