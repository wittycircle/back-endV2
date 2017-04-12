const {wm, TEMPLATES} = require('./wittymail');
const helper = require('sendgrid').mail;
const h = require('../../models/helper');
const {db, TABLES} = require('../../models/index');
const _ = require('lodash');

let htmlString = (img, name, loc, url) => `
            <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block; margin: auto; background-color: #fff" max-width="110">
                <tr>
                    <td><img src="${img}" style="vertical-align: middle; display: inline-block; width: 70px; height: 70px; border-radius: 35px;" alt="user photo"/>
                    </td>
                    <td width="15"></td>
                </tr>
            </table>
            
            <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block; margin: auto; background-color: #fff; vertical-align: top" width="265">
                <tr height="10"></tr>
                <tr>
                    <td width="265" class="info-position">
                        <div class="name-position" style="font-size: 18px; font-weight: 500;">${name}</div>
                        <div style="height: 10px; width: 100%"></div>
                        <div style="font-size: 14px; font-family: 'Helvetica'; max-width: 250px; font-weight: 400; color: #999999"><img src="https://res.cloudinary.com/dqpkpmrgk/image/upload/v1458222562/Witty-icon/Signup/location-icon-gray.png" alt="location" style="height: 14px; width: auto"> ${loc}</div>
                    </td>
                </tr>
                <tr height="20"></tr>
            </table>
            
            <table border="0" cellpadding="0" cellspacing="0" style="display: inline-block; margin: auto; background-color: #fff; text-align: center; vertical-align: top" width="250">
                <tr height="10"></tr>
                <tr>
                	<td height="40" width="250">
                        <a href="${url}" style="padding: 10px 25px; background-color: #416299; color: white; border-radius: 4px; text-decoration: none; font-size: 16px">View profile</a>
                	</td>
                </tr>
                <tr height="30"></tr>
            </table>
            
            <table border="0" cellpadding="0" cellspacing="0" style="margin: auto; background-color: #fff" max-width="600">
                <td width="200" height="20"></td>
            </table>`

const fillSub = (d, sub, i) => {
    return htmlString(d.profile_picture, d.fullName, d.location, wm.url(d.username))
};

const send_mail = (data, bail) => {
    let mail = new helper.Mail();
    wm.from(mail, 'noreply@wittycircle.com', "Wittycircle");
    wm.content(mail)
    wm.reply(mail, "noreply@wittycircle.com");
    mail.setTemplateId(TEMPLATES.profile_views)

    data.forEach((e, i) => {
        let pers = new helper.Personalization();
        let subject = `${e.first_name}, someone is interested in your profile.`
        let notif = e.notif.split(',')
        let laString = '';
        let nview = notif.length;
        let sub = {
            "*|UNAME|*": e.first_name,
            "*|NVIEW|*": nview.toString(),
            "*|EMAIL|*": e.email,
            "*|PLEIN_DE_BAIL|*": "toto",
        };
        bail[i].forEach(b => laString += fillSub(b, sub, i))
        sub["*|PLEIN_DE_BAIL|*"] = laString || 'Not found';
        console.log(sub)
        console.log("\n-------------------------------------------------\n")
        wm.subject(pers, subject);
        wm.to(pers, /*e.email*/ 'sequoya@wittycircle.com');
        wm.substitutions(pers, sub)
        mail.addPersonalization(pers)
    }); //foreach
    wm.send(mail);
    return null;
};

const profile_views = (args) => {
    const request = db.distinct('l.user_id', 'u.email', 'p.first_name', db.raw('GROUP_CONCAT(l.user_notif_id) as notif'))
        .from(TABLES.NOTIF_LIST + ' as l')
        .join(TABLES.USERS + ' as u', 'l.user_id', 'u.id')
        .join(TABLES.USER_PROFILES + ' as p', 'p.id', 'u.profile_id')
        .join(wm.notif('profile_view'), 'n.user_id', 'l.user_id')
        .whereRaw(`DATE(date_of_view) <= CURDATE() - INTERVAL 1 DAY
						AND DATE(date_of_view) >= CURDATE() - INTERVAL 2 DAY`) //unsure, just for testing
        .andWhere('type_notif', 'view')
        .andWhere('n_read', 0)
        .groupBy('l.user_id')

    let reqAll = (notif) => db.distinct(h.p_uarray.concat([h.format_location])).from(TABLES.USER_PROFILES + ' as p')
        .join(TABLES.USERS + ' as u', 'u.profile_id', 'p.id')
        .whereIn('u.id', notif);

    return request.then(array => {
        let x = [];
        array.forEach(e => {
            let notif = e.notif.split(',')
            x.push(reqAll(notif).then(x => x))
        });//foreach
        return Promise.all(x).then(bail => send_mail(array, bail))
    });
};//exports

module.exports = profile_views
