const {db, TABLES} = require('./app/models/index');
const h = require('./app/models/helper'),
 _ = require('lodash');


const modify_project = () => {
return  db.schema.table('views', function(t) {
        t.dropColumns([
            "view",
            "user_viewed_username", 
            ]);
        t.renameColumn('user_viewed_id', 'viewed')
        t.renameColumn('m_read', 'mail_sent')
    });
};

const modify_db = () => {
    return modify_project().then(console.log("SHould have worked"))
}

modify_db();