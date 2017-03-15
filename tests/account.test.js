'use strict';

const {db, TABLES} = require('../app/models/index'),
    bcrypt = require('bcrypt-nodejs'),
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
            token: null,
            reset_token: null,
            uid: null,
            email: rnd_string + "@divine.com",
            password: "angel",
            update_password: "helloworld",
            new_password: "Archangel",
        };
// ------------------ main Tests ------------------
    describe('', function () {
        it('should print something big', function () {
            console.log("\x1b[35m" + " ------------------ ACCOUNTS ------------------\n");
        })
    });
    describe('Create account [POST /accounts/register]', function () {
        let r, v;
        const data = {
            account: {
                first_name: "Creation",
                last_name: "Divine",
                email: test.email,
                password: test.password,
            }
        }
        before('request', function () {
            r = chakram.post(route + 'register', data);
        });

        it('Should match schema', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        after('Get token', function () {
            let max_id = db(TABLES.ACCOUNT_VALIDATION).select(db.raw('MAX(id)'));
            return db(TABLES.ACCOUNT_VALIDATION)
                .select('token', 'id').where('id', max_id)
                .then(r => {
                    test.token = r[0].token;
                    test.uid = r[0].id;
                });
        });
    });

    describe('activate [GET /accounts/activate/:token]', function () {
        let r, v;
        before('request', function () {
            r = chakram.get(route + "activate/" + test.token);
        });

        it('Should send success', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        it('row "valid" from users should be 1', function () {
            let max_id = db(TABLES.USERS).select(db.raw('MAX(id)'));
            return db(TABLES.USERS).select('valid').where('id', max_id)
                .then(r => {
                    return expect(r[0].valid).to.equal(1) 
                });
        });
    });

    describe('Recover password [POST /accounts/password-reset]', function () {
        let r, v;
        let data = {
            email: test.email,
        };
        before('request', function () {
            r = chakram.post(route + "password-reset", data);
        });

        it('Should send success', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        it('Should have modify db', function () {
            let max_id = db(TABLES.RESET_PASSWORDS).select(db.raw('MAX(id)'));
            return db(TABLES.RESET_PASSWORDS).select('user_email', 'token').where('id', max_id)
                .then(r => {
                    test.reset_token = r[0].token;
                    return expect(r[0].user_email).to.equal(test.email);
                });
        });
    });

    describe('Reset password [PUT /accounts/password-reset/:token]', function () {
        let r, v;
        let data = {
            email: test.email,
            password: test.new_password,
        };
        before('request', function () {
            r = chakram.put(route + "password-reset/" + test.reset_token, data);
        });

        it('Should send success', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        it('Should have modify db', function () {
            let max_id = db(TABLES.USERS).select(db.raw('MAX(id)'));
            return db(TABLES.USERS).select('password').where('id', max_id)
                .then(r => {
                    return expect(bcrypt.compareSync(test.new_password, r[0].password)).to.equal(true);
                });
        });
    });

    describe('Update password [PUT /accounts/password]', function () {
        let r, v;
        before('request', function () {
            r = chakram.put(route + "password", {password: test.update_password});
        });

        it('Should match schema', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        it('Should have modify db', function () {
            return db(TABLES.USERS).select('password').where('id', 3719)
                .then(r => {
                    return expect(bcrypt.compareSync(test.update_password, r[0].password)).to.equal(true);
                });
        });

    });
}// ------------------ end module ------------------