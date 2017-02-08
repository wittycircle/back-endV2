const {db, TABLES} = require('./index'),
    h = require('./helper');

exports.getProjectLikes = (project_id) => {
    return db.select(h.p_array)
        .from(TABLES.PROJECT_LIKES + ' as pl')
        .join(TABLES.PROJECTS + ' as pj', 'pj.id', 'pl.follow_project_id')
        .join(h.u_profile, 'p.uid', 'pl.user_id')
        .where({'pj.id': project_id})
        .groupBy('p.id')
};

exports.likeProject = (project_id, uid) => {
    return db(TABLES.USERS).select('id').where('id', uid).then(r => {
        if (r) {
            return db(TABLES.PROJECT_LIKES)
                .insert({
                    user_id: uid,
                    follow_project_id: project_id
                });
        }
    });
};

exports.unlikeProject = (project_id, uid) => {
    return db(TABLES.PROJECT_LIKES).del()
        .where({
            user_id: uid,
            follow_project_id: project_id
        })
};

exports.getFromProjectNetwork = (need, cond) => {
    return db(TABLES.PROJECT_NETWORK)
        .select(need)
        .where(cond)
};

exports.updateProjectNetwork = (info, cond) => {
    return db(TABLES.PROJECT_NETWORK)
        .update(info)
        .where(cond)
};

exports.getProjectDiscussions = (project_id) => {

};

