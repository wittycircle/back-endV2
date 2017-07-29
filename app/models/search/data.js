const h = require('../helper');

module.exports = {
  profile_array: [
    'p.id',
    'p.user_id',
    'p.picture',
    'p.about',
    'p.cover_picture',
    'p.description',
    'nl.name as network',
    h.format_location,
    h.fullname,
    'u.username'
  ],
  ret_array: [
    'fullName',
    'username',
    'rank',
    'sort.id as user_id',
    'p.id',
    'picture',
    'foli',
    'cover_picture',
    'about',
    'description',
    'network',
    'city',
    'state',
    'country',
    'follower',
    'following',
    'skills'
  ]
};
