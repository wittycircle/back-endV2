/**
 * Created by rdantzer on 03/06/17.
 */

const social = require('../services/social');
const mailer = require('../services/mailer');

exports.updateProfileFromLinkedin = (req, res, next) => {
  const { profile } = req.body;
  const user = req.user;

  social.getLinkedinProfileInfo(profile).then(results => res.send(results));
};

exports.InviteFriendsFromGoogle = (req, res, next) => {
  const { token } = req.body;

  social
    .gmailContactsCampaign(token)
    .then(mailList =>
      mailer.invite_user({ uid: req.user.id, mailList, category: 'gmail' })
    )
    .then(() => {
      req.broadcastEvent('add_points', { user_id: req.user.id, points: 2000 });
      return db('user_socials')
        .update('invite_google', 1)
        .where('user_id', args.uid);
    })
    .then(() => res.send({ success: true }));
};
