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
      mailer.invite_user({ uid: req.user, mailList, category: 'gmail' })
    )
    .then(() => res.send({ success: true }));
};
