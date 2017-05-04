const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');


const fillSub = (d, sub, i) => {
    sub[`*|FFNAME${i}|*`] = d.first_name,
    sub[`*|FLNAME${i}|*`] = d.last_name,
    sub[`*|FIMG${i}|*`] = d.profile_picture,
    sub[`*|FLOC${i}|*`] = d.location,
    sub[`*|FDESC${i}|*`] = wm.truncate(d.description)
    sub[`*|FURL${i}|*`] = wm.url(d.username)
};

const send_mail = (data, bail) => {
    let mail = new helper.Mail();
    wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
    wm.content(mail)
    wm.reply(mail, "noreply@wittycircle.com");
    mail.setTemplateId(TEMPLATES.profile_views)

    data.forEach((e, i) => {
        let pers = new helper.Personalization();
        let subject = "You may have something special 🙈  *|NVIEW|* people recently visited your profile."
        let notif = e.notif.split(',')
        let laString = '';
        let nview = notif.length;
        let sub = {
            "*|FNAME|*": e.first_name,
            "*|NVIEW|*": nview.toString(),
            "*|EMAIL|*": e.email,
        };
        bail[i].forEach((b, j) => fillSub(b, sub, j + 1))
        wm.subject(pers, subject);
        wm.to(pers, e.email);
        wm.substitutions(pers, sub) 
        mail.addPersonalization(pers)
    }); //foreach
    wm.send(mail);
    return null;
};

const profile_views = (args) => {
    const request = db.distinct('v.user_id', 'u.email', 'p.first_name', 'p.description', db.raw('GROUP_CONCAT(v.viewed) as notif'))
    .count('v.viewed as vcount')
        .from('views as v')
        .join(TABLES.USERS + ' as u', 'v.user_id', 'u.id')
        .join(TABLES.USER_PROFILES + ' as p', 'p.id', 'u.profile_id')
        .join(wm.notif('profile_view'), 'n.user_id', 'v.user_id')
        .having('vcount', '>=', 5)
        .andWhere('mail_sent', 0)
        .groupBy('v.user_id')

    let reqAll = (notif) => db.distinct(h.p_uarray.concat([h.format_location])).from(TABLES.USER_PROFILES + ' as p')
        .join(TABLES.USERS + ' as u', 'u.profile_id', 'p.id')
        .whereIn('u.id', notif);

    let setToOne = (ids) => db('views').update('mail_sent', 1).whereIn('user_id', ids)

    return request.then(array => {
        if (!array.length){
            console.log("empty")
            return null;
        }
        let x = [];
        let ids = array.map(e => e.user_id)

        array.forEach(e => {
            let notif = e.notif.split(',')
                x.push(reqAll(notif).then(x => x))
        });//foreach
        x.push(setToOne(ids).return())

        return Promise.all(x).then(bail => send_mail(array, bail))
    });
};//exports

module.exports = profile_views
