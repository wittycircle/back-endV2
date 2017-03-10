'use strict';

const { db, TABLES } = require('../app/models/index'),
     p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('accounts/'),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            accounts: require('./schemas/account.schema'),
            search: require('./schemas/search.schema'),
            error: require('./schemas/error.schema')
        },
        test = {
            token:null,
        };
// ------------------ main Tests ------------------
        describe('Create account [POST /accounts/register]', function() {
            let r, v;
            const data = {
                account: {
                first_name : "Creation",
                last_name: "Divine",
                email: rnd_string +"@divine.com",
                password: "angel"
                }
            }
            before('request', function() {
                r = chakram.post(route + 'register', data);
            });
        
            it('Should match schema', function() {
                return expect(r).to.joi(schemas.common.success);
            });

            after('Get token', function() {
                let max_id = db(TABLES.ACCOUNT_VALIDATION).select(db.raw('MAX(id)'));
                return db(TABLES.ACCOUNT_VALIDATION)
                    .select('token').where('id', max_id)
                .then(r => {
                    test.token = r[0].token;
                });
            });
        });

        describe('activate [GET /accounts/activate/:token]', function() {
            let r, v;
            before('request', function() {
                r = chakram.get(route + "activate/" + test.token);
            });
        
            it('Should send success', function() {
                return expect(r).to.joi(schemas.common.success);
            });

            it('row "valid" from users should be 1', function() {
                let max_id = db(TABLES.USERS).select(db.raw('MAX(id)'));
                return db(TABLES.USERS)
                    .select('valid').where('id', max_id)
                .then(r => {
                    return expect(r[0].valid).to.equal(1) 
                });
            });
        });
}// ------------------ end module ------------------