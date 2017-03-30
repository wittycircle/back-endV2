const { db, TABLES } = require('./index'),
    h = require('./helper')

// ------------------ Main methods ------------------

// SELECT * FROM profiles p INNER JOIN users u ON p.id = u.profile_id WHERE ${auth}_id = ${id}
exports.getUserBySocialId = (id, auth) => {
    let key = `${auth}_id`;
    return db.select('*')
        .from(`${TABLES.USER_PROFILES} as p`)
        .innerJoin(`${TABLES.USERS} as u`, 'p.id', 'u.profile_id')
        .where(key, id)
};

exports.getUserBy = (by) => {
    return db.select(['id', 'profile_id', 'password']).from(TABLES.USERS).where(by);
};

exports.getUserByEmail = (email) => {
    return db.select('id').from(TABLES.USERS)
        .where('email', email)
};

exports.createProfile = (first, last) => {
    return db(TABLES.USER_PROFILES)
            .insert({'first_name' : first, 'last_name': last})
};

exports.checkUsername = (username) => {
    return db(TABLES.USERS)
            .select('username')
            .whereIn('username', username)
};

exports.createUser = (profile_id, email, username, password) => {
    return db(TABLES.USERS)
        .insert({
        'profile_id': profile_id,
        'email': email,
        'username': username,
        'password': password
    })
};

// ------------------ Skills ------------------
exports.getUserSkills = (id) => {
    return db.select(['skill_id as id', 'name', 'category'])
        .from(TABLES.SKILLS + ' as s')
        .join(TABLES.USER_SKILLS + ' as us', 'us.skill_id', 's.id')
        .where({user_id: id})
        .groupBy('us.skill_id')
};

exports.addUserSkill = (id, uid) => {
    return Promise.all([h.exist(TABLES.SKILLS, id), h.exist(TABLES.USERS, uid)])
    .then(([r1, r2]) => {
        if (!r1.length || !r2.length){
            return (!r1.length ? "Invalid skill id" : "Invalid user id")
        } else {
            return db(TABLES.USER_SKILLS).select('id')
                .where({user_id: uid, skill_id: id})
                .then(r => {
                    if (!r.length) {
                        return db(TABLES.USER_SKILLS)
                        .insert({user_id: uid, skill_id: id}) 
                        .then(() => exports.getUserSkills(uid))
                    } else {
                        return exports.getUserSkills(uid)
                    }
                });
        }
    });
};

exports.removeUserSkill = (id, uid) => {
    return db(TABLES.USER_SKILLS).select('id').where('skill_id', id).then(r => {
        if (r && r.length) {
            return db(TABLES.USERS).select('id').where('id', uid).then(r => {
                if (r && r.length) {
                    return db(TABLES.USER_SKILLS)
                        .del()
                        .where({'user_id': uid, 'skill_id': id})
                } else {
                    return "Invalid id"
                }
            })
        } else {
            return "Invalid user id"
        }
    })
};

// ------------------ Projects ------------------

exports.getProjectsInvolved = (uid) => {
    return db.distinct(['pr.id', 'pr.title'])
        .from(TABLES.PROJECTS + ' as pr')
        .join(TABLES.PROJECT_MEMBERS + ' as m', 'm.project_id', 'pr.id')
        .join(TABLES.USERS + ' as u', function() {
            this.on('u.id', 'pr.user_id')
                .orOn('u.id', 'm.user_id')
        })
        .where('u.id', uid)
};

exports.getProjectFollow = (uid) => {
    return db.count('pl.id as count')
            .from(TABLES.PROJECT_LIKES + ' as pl', 'pl.user_id', 'u.id')
            .where('pl.user_id', uid)
};

// ------------------ INTERESTS ------------------

getInterest = exports.getInterests = (uid) => {
    return db.distinct('i.name', 'i.priority')
            .from(TABLES.USER_INTERESTS + ' as ui')
            .join(TABLES.INTERESTS + ' as i', 'i.id', 'ui.interest_id')
            .join(TABLES.USERS + ' as u', 'u.id', 'ui.user_id')
            .where('u.id', uid)
};

exports.addInterest = (uid, data) => {
    return db.select('id').from(TABLES.INTERESTS).where('name', data) 
    .then(iid => {
        if (!iid.length)
            return "Interest does not exist"
        return db(TABLES.USER_INTERESTS).insert({
            user_id: uid, 
            interest_id: iid[0].id, 
            interest_name: data 
        })
    }).then((a) => {
        if (typeof a == 'string')
            return a;
        return getInterest(uid)
    })
};

exports.removeInterest = (uid, data) => {
    return db.select('id').from(TABLES.INTERESTS).where('name', data)
    .then(iid => {
        if (!iid.length)
            return "Interest does not exist"
        return db(TABLES.USER_INTERESTS).del()
                .where({user_id: uid, interest_id: iid[0].id})
    }).then(a => {
        if (typeof a == 'string')
            return a;
        return getInterest(uid)
    })
};


// ------------------ EXPERIENCES ------------------
exports.getExperiences = (uid) => {
    return db.select('e.*')
            .from(TABLES.USER_EXPERIENCES + ' as e')
            .join(TABLES.USERS + ' as u', 'u.id', 'e.user_id')
            .where('u.id', uid)

};

exports.addExperience = (uid, data) => {
    data.user_id = uid;
    return db(TABLES.USER_EXPERIENCES)
        .insert(data)
};

exports.removeExperience = (uid, data) => {
    return db(TABLES.USER_EXPERIENCES)    
        .del()
        .where({user_id: uid, id: data})
};
