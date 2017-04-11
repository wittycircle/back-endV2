const statistics = require('../models/statistics'),
    _ = require('lodash');


// ------------------ NETWORKS ------------------
exports.allProfiles = (req, res, next) => {
    statistics.networkAllProfiles(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send(r)
            }
        })
        .catch(err => next(err))
};

exports.allProjects = (req, res, next) => {
    statistics.networkAllProjects(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send(r)
            }
        })
        .catch(err => next(err))
};

//			*** Profiles ***

exports.networkProfiles = (req, res, next) => {
    statistics.networkProfiles(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send({count: r.length, profiles: r})
            }
        })
        .catch(err => next(err))
};

exports.networkProfileSkills = (req, res, next) => {
    statistics.networkProfileSkills(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send({skills: r})
            }
        })
        .catch(err => next(err))
};

exports.networkLocation = (req, res, next) => {
    statistics.networkLocation(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send({location: r})
            }
        })
        .catch(err => next(err))
};
exports.networkInterests = (req, res, next) => {
    statistics.networkInterests(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send({interests: r})
            }
        })
        .catch(err => next(err))
};

// ------------------  ------------------
//			*** Projects ***
exports.networkProjects = (req, res, next) => {
    statistics.networkProjects(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send({project: r})
            }
        })
        .catch(err => next(err))
};

exports.networkProjectAbout = (req, res, next) => {
    statistics.networkProjectAbout(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send({About: r})
            }
        })
        .catch(err => next(err))
};

exports.networkProjectNeeds = (req, res, next) => {
    statistics.networkProjectNeeds(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send({needs: r})
            }
        })
        .catch(err => next(err))
};

exports.networkProjectFollow = (req, res, next) => {
    statistics.networkProjectFollow(req.params.name)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown network'])
            }
            else {
                res.send({most_upvoted: r})
            }
        })
        .catch(err => next(err))
};

// ------------------ Profiles Stats ------------------

exports.infoProfiles = (req, res, next) => {
    statistics.infoProfiles(req.params.profile_id)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'Unknown id'])
            }
            else {
                let o = {}
                r.forEach(e => o[e.field] = e.value)
                res.send({profile: o})
            }
        })
        .catch(err => next(err))
};
