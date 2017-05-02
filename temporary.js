const {db, TABLES} = require('./app/models/index');
// const {wm, TEMPLATES} = require('./app/services/mailer/wittymail');
// const helper = require('sendgrid').mail;

const h = require('./app/models/helper'),
    redis = require('ioredis')(require('./app/private').redis),//<= sale
 _ = require('lodash');


const stupid = () => {
    let x = []
    return db(TABLES.USER_PROFILES).select('id', 'profile_picture').whereNull('profile_picture')
    .then(mis => {
        let ids = mis.map(e => e.id)
        return db('witty_profile_pictures').select('url')
        .then(urls => {
            urls = urls.map(e => e.url)
            ids.forEach(id => {
                let rnd = Math.floor((Math.random() * 16) + 1) % 16;
                let ur = urls[rnd]
                x.push(db(TABLES.USER_PROFILES).update('profile_picture', ur).where('id', id))
            })
            return Promise.all(x)
        })
    })
}

stupid().then(r => (console.log(r, r.length)))