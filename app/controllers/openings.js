const opening = require('../models/openings');

exports.updateOpening = (req, res, next) => {
    opening.updateOpening(req.params.opening_id, req.body)
        .then(r => {
            if (typeof r === 'string') {
                return next([r, 'bad id'])
            }
            else {
                res.send({success: true})
            }
        })
        .catch(err => next(err))
};

exports.deleteOpening = (req, res, next) => {
    opening.deleteOpening(req.params.opening_id)
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
